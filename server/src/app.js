require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('./config/dbConnect');
const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

mongoose.connect();

app.use(cors());
app.use(express.json());

app.use('/api', roleRoutes);
app.use('/api', userRoutes);

app.listen(9999, () => {
   console.log('Server Connected')
})