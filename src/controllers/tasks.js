const asyncHandler = require("express-async-handler");
const taskModel = require('../models/tasks.js');

// @desc     Auth user/ set token
// route     POST /api/user/auth
// @access   Public
// const authUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;

//     const user = await userModel.findOne({email});

//     if(user && (await user.matchPassword(password))) {
//         generateToken(res, user._id);

//         res.status(201).json({
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//         });
//     } else {
//         res.status(401);
//         throw new Error('Invalid email or password');
//     }
// });

// @desc     Create a new tasks
// route     POST /api/tasks
// @access   Privet
const createTask = asyncHandler(async (req, res) => {
    const { title, description, status } = req.body;
    console.log("user", req.user);

    const newTask = await taskModel.create({
        user: req.user._id,
        title,
        description,
        status,
    });
    console.log(newTask)

    if(newTask) {
        res.status(201).json({
          _id: newTask._id,
          title: newTask.title,
          description: newTask.description,
          status: newTask.status,
        });
    } else {
        res.status(400);
        throw new Error('Invalid task Data');
    }
});


// @desc     Get all tasks
// route     GET /api/tasks
// @access   Privet
const getTasks = asyncHandler(async (req, res) => {
    try {
        const tasks = await taskModel
            .find({user: req.user._id}, 'title status description')
            .populate('user', '_id')
            .exec();

        if (tasks) {
          res.status(200).json({ tasks });
        } else {
          res.status(400).json({ message: 'Tasks not found' });
        }
    } catch (error) {
        // Handle unexpected errors, e.g., log the error or send a generic error response
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
      
});

// @desc     Update user profile
// route     PUT /api/user/profile
// @access   Privet
// const updateUserProfile = asyncHandler(async (req, res) => {

//     const user = await userModel.findById(req.user._id);

//     if(user) {
//         user.name = req.body.name || user.name;
//         user.email = req.body.email || user.email;

//         if(req.body.password) {
//             user.password = req.body.password;
//         }

//         const updatedUser = await user.save();

//         res.status(200).json({
//             _id: updatedUser._id,
//             name: updatedUser.name,
//             email: updatedUser.email,
//         });
//     } else {
//         res.status(404);
//         throw new Error('User not found');
//     }
// });

module.exports = { createTask, getTasks }