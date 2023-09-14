const express = require("express");
const router = express.Router();
const { getTasks, createTask } = require("../controllers/tasks.js");
const { protect } = require('../middleware/authMidleware.js');

router.route('/')
    .get(protect, getTasks)
    .post(protect, createTask);

module.exports = { tasksRouter: router }