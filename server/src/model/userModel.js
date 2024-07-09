const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: true
   },
   lastName: {
      type: String,
      required: true
   },
   passworod: {
      type: String,
      required: true
   },
   roles: [
      {
         type: mongoose.Schema.ObjectId,
         ref: 'Role'
      }
   ]
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);