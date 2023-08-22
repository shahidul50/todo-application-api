import jwt from 'jsonwebtoken'

// Generate JWT
const generateToken = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: '10d',
    })
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',  //Use secure cookies in production
        sameSite: 'strict',   //Prevent CSRF attacks
        maxAge: 10*24*60*60*1000,  // 10 days Validity
    })
  }

  export default generateToken;