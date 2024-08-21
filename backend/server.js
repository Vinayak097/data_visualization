// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
    
    // List all databases
    const adminDb = mongoose.connection.db.admin();
    const dbInfo = await adminDb.listDatabases();
    console.log('Available databases:', dbInfo.databases.map(db => db.name));

    // List collections in the current database
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections in the current database:', collections.map(c => c.name));

    // Check for specific collections
    const orderCollection = collections.find(c => c.name === 'shopifyOrders');
    const customerCollection = collections.find(c => c.name === 'shopifyCustomers');

    if (!orderCollection) {
      console.log('Warning: shopifyOrders collection not found');
    }
    if (!customerCollection) {
      console.log('Warning: shopifyCustomers collection not found');
    }

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

app.use('/api', require('./routes/Analytics'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));