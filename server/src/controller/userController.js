const { passwordEncrypt } = require('../helpers/passwordHelper');
const User = require('../model/userModel');

const registerUser = async (req, res) => {
   try {

      const { firstName, lastName, email, password, mobile } = req.body.data;
      const existingUser = await User.findOne({email});

      if(existingUser){
         res.status(400).json({message: 'Email already exists', success: false})
         return;
      }

      const encryptedPassword = await passwordEncrypt(password);

      const user = new User({
         firstName,
         lastName,
         email,
         mobile,
         password: encryptedPassword
      })

      await user.save();
      res.status(201).json({message: 'Registration successfull', success: true})

   } catch (error) {
      console.log(error)
      res.status(500).json({message: 'Internal server error', success: false});
   }
}

const updateUser = async (req, res) => {
   try {
      
   } catch (error) {
      
   }
}

const deleteUser = async (req, res) => {
   try {
      
   } catch (error) {
      
   }
}

const loginUser = async (req, res) => {
   try {
      
   } catch (error) {
      
   }
}

const showUsers = async (req, res) => {
   try {
      
   } catch (error) {
      
   }
}

const getSingleUser = async (req, res) => {
   try {
      
   } catch (error) {
      
   }
}

module.exports = {
   registerUser,
   updateUser,
   deleteUser,
   loginUser,
   showUsers,
   getSingleUser
}