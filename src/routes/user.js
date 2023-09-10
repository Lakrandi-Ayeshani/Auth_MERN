const express = require("express");
const router = express.Router();
const { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile } = require("../controllers/user.js");
const { protect } = require('../middleware/authMidleware.js');

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
// router.get('/profile', getUserProfile);
// router.put('/profile', updateUserProfile);
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

module.exports = { userRouter: router }