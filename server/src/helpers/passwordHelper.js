const bcrypt = require('bcrypt');

const passwordEncrypt = async (password) => {
   try {
      const securePassword = await bcrypt.hash(password, 10);
      return securePassword
   } catch (error) {
      console.log(error);
      throw new Error('Error hashing password');
   }
}

const passwordDcrypt = async (data, password) => {
   try {
      const isMatch = await bcrypt.compare(data.password);

      if(!isMatch) return false
      else return true;
   } catch (error) {
      console.log(error)
      return false
   }
}

module.exports = {
   passwordDcrypt,
   passwordEncrypt
}

