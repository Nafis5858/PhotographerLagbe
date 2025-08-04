const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from the 'public' directory
app.use(express.static('client/public'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Database connection
const connectDB = async () => {
  try {
    // Force disconnect any existing connections
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    
    console.log('Connecting to MongoDB...');
    console.log('URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
    
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/photographerlagbe', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
    console.log('Connection state:', mongoose.connection.readyState);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('⚠️  Starting server without database connection...');
    console.log('💡 To use full features, please:');
    console.log('   1. Install MongoDB locally, or');
    console.log('   2. Use MongoDB Atlas (cloud) and update MONGODB_URI in .env file');
  }
};

connectDB();

// Trust proxy
app.set('trust proxy', 1);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/photographers', require('./routes/photographers'));
app.use('/api/users', require('./routes/users'));

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to PhotographerLagbe API',
    status: 'Server is running!',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Connected (readyState: ' + mongoose.connection.readyState + ')',
    timestamp: new Date().toISOString()
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    server: 'Running',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Connected (readyState: ' + mongoose.connection.readyState + ')'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(5001, () => {
  console.log(`Server running on port 5001`);
});
