const mongoose = require('mongoose');

const roleModel = new mongoose.Schema({
   roleName: {
      type: String,
      required: true
   },
   permissions: {
      type: [String]
   },
   isDeleted: {
      type: Boolean,
      default: false
   }
}, {timestamps: true});

module.exports = mongoose.model('Role', roleModel);