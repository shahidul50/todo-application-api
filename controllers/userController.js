import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  
  // Create user and save user
  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    //genate token for register user
    generateToken(res, user._id)

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

//@desc Auth user & get token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async(req,res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
      //genarete token for login user
      generateToken(res, user._id)

      res.json({
        _id : user._id,
        name : user.name,
        email : user.email,
      })
    }else{
      res.status(401)
       throw new Error('Invalid email or Password')
    }
})

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
   res.cookie('jwt','',{
    httpOnly: true,
    expires: new Date(0),
   })
   res.status(200).json({message: 'Logged out successfully'})
})

// @desc    Get All data
// @route   GET /api/users/dashboard
// @access  Private
const dashboard = asyncHandler(async (req, res) => {
    res.json({
      message: `Welcome ${req.user.name} `
    })
})

// @desc    Get user data
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id);
   if(user){
    res.json({
      _id : user._id,
      name : user.name,
      email : user.email,
    });
   }else{
     res.status(404);
     throw new Error('User Not Found');
   }
})

// @desc    Update user profile
// @route   GET /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if(user){
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if(req.body.password){
      user.password = req.body.password
    }

    //updated user Profile
    const updatedUser = await user.save();
    res.json({
      _id : updatedUser._id,
      name : updatedUser.name,
      email : updatedUser.email,
    })
  }else{
    res.status(404);
    throw new Error('User Not Found')
  }
});

export {
  registerUser,
  authUser,
  logoutUser,
  dashboard,
  getUserProfile,
  updateUserProfile
}