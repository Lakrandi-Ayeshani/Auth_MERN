const mongoose = require('mongoose');
const userModel = require('./user.js')

const taskSchema = mongoose.Schema({
    user: {
        type: mongoose.ObjectId, ref: userModel
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});
 
const taskModel = mongoose.model('Task', taskSchema)
module.exports = taskModel;