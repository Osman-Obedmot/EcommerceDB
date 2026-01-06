
const express = require('express');
const router = express.Router();

const validate = require('../middleware/validate');
const userSchema = require('../validater-joi/users.schema');

const usersController = require('../controller/usersController');

//signup user
router.post('/auth/signup', validate(userSchema.createUserSchema), usersController.signupUser);

//login user
router.post('/auth/login', usersController.loginUser);

//get user profile
router.get('/:userId', usersController.getUser);

module.exports = router;