const asyncHandler = require("express-async-handler");
const userModel = require('../models/user.js');

// @desc     Auth user/ set token
// route     POST /api/user/auth
// @access   Public
const authUser = asyncHandler(async (req, res) => {
    // res.status(401)
    // throw new Error('Something went wrong');
    res.status(200).json({message: "Auth User"})
});

// @desc     Register a new user
// route     POST /api/user
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    
    const userExist = await userModel.findOne({email: email});

    if(userExist) {
        res.status(400);
        throw new Error('User Already Exist');
    }

    const user = await userModel.create({
        name,
        email,
        password
    });

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid User Data');
    }
});

// @desc     Logout user
// route     POST /api/user/logout
// @access   Public
const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: "Logout User"})
});

// @desc     Get user profile
// route     GET /api/user/profile
// @access   Privet
const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({message: "User profile"})
});

// @desc     Update user profile
// route     PUT /api/user/profile
// @access   Privet
const updateUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({message: "Update User"})
});

module.exports = { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile }