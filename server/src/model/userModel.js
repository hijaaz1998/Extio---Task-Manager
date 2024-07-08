const mongoose = require('mongoose');

const roleModel = new mongoose.Schema({
   roleName: {
      type: String,
      required: true
   },
   permissions: [
      {
         name:
      }
   ]
})