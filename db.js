// db.js
const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const mongoUrl = process.env.DB_URL;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;

db.on('connected', () => {
  console.log('Database connected');
});

db.on('error', (error) => {
  console.log('MongoDB connection error:', error);
});

db.on('disconnected', () => {
  console.log('Database disconnected');
});

module.exports = db;
