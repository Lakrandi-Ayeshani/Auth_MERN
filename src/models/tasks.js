const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
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