import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User  from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
   // Get token cookie from Browser Cookies
  let token = req.cookies.jwt;

  if (token) {
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      console.log(decoded);
      // Get user from the token
      req.user = await User.findById(decoded.userId).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }else{
    res.status(401)
    throw new Error('Not authorized, no token') 
  }
})

export default protect  