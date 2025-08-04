const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();

console.log('🔧 Fixing MongoDB Connection...');
console.log('==============================');

// Test different password variations
const testPasswords = [
  'nafis',
  'nafiskamal2000',
  'password123',
  'nafis123',
  'Nafis123'
];

async function testAndFix() {
  for (const password of testPasswords) {
    console.log(`\n🔄 Testing password: ${password}`);
    
    const uri = `mongodb+srv://nafiskamal2000:${password}@cluster0.losfb4v.mongodb.net/photographerlagbe?retryWrites=true&w=majority`;
    
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
      console.log(`✅ SUCCESS! Password "${password}" works!`);
      
      // Update .env file with working password
      const envContent = `MONGODB_URI=mongodb+srv://nafiskamal2000:${password}@cluster0.losfb4v.mongodb.net/photographerlagbe?retryWrites=true&w=majority
JWT_SECRET=photographerlagbe_super_secret_jwt_key_2024
PORT=5000
NODE_ENV=development`;

      fs.writeFileSync('.env', envContent);
      console.log('✅ .env file updated with working password!');
      
      await mongoose.disconnect();
      return true;
      
    } catch (error) {
      console.log(`❌ Failed with password: ${password}`);
    }
  }
  
  console.log('\n❌ None of the tested passwords worked.');
  console.log('💡 You need to reset your MongoDB Atlas password.');
  return false;
}

testAndFix().then((success) => {
  if (success) {
    console.log('\n🎉 Database connection fixed!');
    console.log('🔄 Please restart your server: node server.js');
  } else {
    console.log('\n📝 Please go to MongoDB Atlas and reset your password.');
  }
}); 