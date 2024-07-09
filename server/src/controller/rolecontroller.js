const Role = require('../model/roleModel');
const User = require('../model/userModel');

const addRole = async (req, res) => {
   try {

       const { roleName, permissions } = req.body;
    
       const existingRole = await Role.findOne({roleName: roleName});

       if(existingRole){
        return res.status(400).json({success: false, message: 'Role already exists'})
       }

       const newRole = await new Role({
        roleName,
        permissions
       });

       await newRole.save();

       res.status(201).json({success: true, message: 'Role added successfully'})

    } catch (error) {
       console.log(error);
       res.status(500).json({ success: false, message: 'Internal server error' });
   }
};

const getRoles = async (req, res) => {
    try {
        const roles = await Role.find({isDeleted: false});
        res.status(200).json({roles, success: true})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const editRole = async (req, res) => {
    try {

        const { roleName, permissions } = req.body;
        const { id } = req.params;

        const updatedRole = await Role.findByIdAndUpdate(id, {roleName, permissions});

        if (!updatedRole) {
            res.status(404).json({ success: false, message: 'Role not found' });
            return;
        }

        res.status(200).json({ success: true, message: 'Role updated successfully' });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRole = await Role.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        if (!deletedRole) {
            return res.status(404).json({ message: 'Role not found', success: false });
        }

        const usersWithRole = await User.find({ roles: id });

        await Promise.all(usersWithRole.map(async (user) => {
            user.roles = user.roles.filter(role => role.toString() !== id);
            await user.save();
        }));

        return res.status(200).json({ message: 'Role deleted successfully', success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
}


module.exports = {
   addRole,
   getRoles,
   editRole,
   deleteRole
};
