const { passwordEncrypt, passwordDcrypt } = require('../helpers/passwordHelper');
const User = require('../model/userModel');
const { createToken } = require('../helpers/jwt');

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
      const { id } = req.params;
      const { firstName, lastName, email, mobile, roles } = req.body;

      const updateFields = {};
      if (firstName) updateFields.firstName = firstName;
      if (lastName) updateFields.lastName = lastName;
      if (email) updateFields.email = email;
      if (mobile) updateFields.mobile = mobile;
      if (roles) {
         updateFields.roles = roles.map(role => role._id);
      }

      const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true });

      if (!updatedUser) {
         return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.json({ success: true, message: 'User updated successfully', user: updatedUser });
   } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
   }
};



const deleteUser = async (req, res) => {
   try {
      const {id} = req.params;

      const deletedUser = await User.findByIdAndDelete(id,{isDeleted: true}, {new: true})
      if (!deletedUser) {
         res.status(404).json({ message: 'User not found', success: false });
         return
      }
      res.status(200).json({ message: 'User deleted successfully', success: true });
      return 
   } catch (error) {
      console.log(error);
        res.status(500).json({ message: 'Internal server error', success: false });
   }
}

const loginUser = async (req, res) => {
   try {
      const { email, password } = req.body;
      
      const userData = await User.findOne({ email }).populate('roles');

      if (!userData) {
         res.status(401).json({ message: 'Invalid email or password' });
         return;
      }

      const matchedPassword = await passwordDcrypt(password, userData.password);

      if (!matchedPassword) {
         res.status(401).json({ message: 'Invalid email or password', success: false });
         return;
      }

      const jwt = createToken(userData._id);

      // Extracting permissions roleName array from roles
      const permissions = userData.roles.reduce((acc, role) => {
         if (role.permissions && role.permissions.length > 0) {
            acc.push(...role.permissions);
         }
         return acc;
      }, []);

      console.log('per',permissions)

      res.json({ message: 'Login successful', success: true, token: jwt, user: { ...userData.toObject(), permissions } });
      return;

   } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
   }
}



const showUsers = async (req, res) => {
   try {
      const users = await User.find({ isDeleted: false }).populate({
         path: 'roles'
      });
      console.log("users",users)
      res.status(200).json({ users, success: true });
   } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
   }
}

const createUser = async (req, res) => {
   try {
      const { firstName, lastName, email, mobile, roles } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
         return res.status(400).json({ message: 'Email already exists', success: false });
      }

      const newUser = new User({
         firstName,
         lastName,
         email,
         mobile,
         roles
      });

      const savedUser = await newUser.save();

      res.status(201).json({ message: 'User created successfully', success: true, user: savedUser });
   } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Failed to create user', success: false });
   }
}


module.exports = {
   registerUser,
   updateUser,
   deleteUser,
   loginUser,
   showUsers,
   createUser
}