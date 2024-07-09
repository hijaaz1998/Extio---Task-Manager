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
      required: true
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
   }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);