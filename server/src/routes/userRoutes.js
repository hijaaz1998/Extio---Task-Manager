const express = require('express');
const userController = require('../controller/userController');

const userRouter = express.Router();

userRouter.post('/user/login', userController.loginUser)
userRouter.post('/user/register', userController.registerUser)
userRouter.post('/user/create', userController.createUser)
userRouter.get('/user/users', userController.showUsers)

userRouter.route('/user/user/:id')
   .put(userController.updateUser)
   .delete(userController.deleteUser)


module.exports = userRouter