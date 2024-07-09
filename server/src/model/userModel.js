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
   email: {
      type: String,
      required: true
   },
   mobile: {
      type: Number
   },
   password: {
      type: String,
   },
   roles: [
      {
         type: mongoose.Schema.ObjectId,
         ref: 'Role'
      }
   ],
   termsAccepted: {
      type: Boolean,
      default: true
   },
   isDeleted: {
      type: Boolean,
      default: false
   }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);