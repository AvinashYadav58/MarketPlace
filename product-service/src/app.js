const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const authorize = require('./authorization/authorize');

require('dotenv').config();

const app = express();
app.use(express.json());

app.use(authorize); 

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
