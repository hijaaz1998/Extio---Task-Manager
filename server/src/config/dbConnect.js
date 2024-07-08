const mongoose = require('mongoose')
const dbURL = process.env.dbURL
const dbName = 'Task Manager'

const dbConnect = {
    connect: () => {
        mongoose.connect(dbURL, { dbName }, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to MongoDB'))
        .catch(error => console.error('Error connecting to MongoDB:', error));
    }
}

  
module.exports = dbConnect