const mongoose = require('mongoose');

// Test different password formats
const testPasswords = [
  'nafis',
  'password123',
  'nafis123',
  'Nafis123',
  'nafiskamal2000'
];

async function testConnection(password) {
  const uri = `mongodb+srv://nafiskamal2000:${password}@cluster0.losfb4v.mongodb.net/photographerlagbe?retryWrites=true&w=majority`;
  
  try {
    console.log(`Testing password: ${password}`);
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ SUCCESS with password: ${password}`);
    await mongoose.disconnect();
    return true;
  } catch (error) {
    console.log(`❌ FAILED with password: ${password} - ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('🔍 Testing MongoDB Atlas Connection...\n');
  
  for (const password of testPasswords) {
    const success = await testConnection(password);
    if (success) {
      console.log(`\n🎉 Found working password: ${password}`);
      console.log('Update your .env file with this password!');
      break;
    }
    console.log(''); // Empty line for readability
  }
  
  console.log('\n💡 If none work, you need to reset your MongoDB Atlas password.');
}

runTests(); 