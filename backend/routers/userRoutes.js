const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require("../middleware/authMiddleware");

router.post('/signup', userController.signupUser);
router.put('/edit', userController.editUser);
router.delete('/delete', userController.deleteUser);
router.post('/login', userController.loginUser);
router.post('/logout',  userController.logoutUser);
router.get('/get-profile', protect , userController.profile);

module.exports = router;
