const express = require('express');
const userController = require('../controller/userController');

const userRouter = express.Router();

userRouter.post('/login', userController.loginUser)
userRouter.post('/register', userController.createUser)
userRouter.get('/users', userController.showUsers)

userRouter.route('/user/:id')
   .get(userController.getSingleUser)
   .put(userController.updateUser)
   .delete(userController.deleteUser)


module.exports = userRouter