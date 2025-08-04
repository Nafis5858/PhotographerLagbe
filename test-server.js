require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔍 Testing Server Configuration...');
console.log('==================================');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set');
console.log('PORT:', process.env.PORT || '5000 (default)');
console.log('');

async function testConnection() {
  try {
    console.log('🔄 Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB connected successfully!');
    console.log('📊 Connection state:', mongoose.connection.readyState);
    console.log('📊 Connection name:', mongoose.connection.name);
    
    await mongoose.disconnect();
    console.log('✅ Test completed successfully!');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

testConnection(); 