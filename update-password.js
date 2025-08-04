const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔧 MongoDB Atlas Password Update Tool');
console.log('=====================================');
console.log('Please follow these steps:');
console.log('1. Go to MongoDB Atlas: https://cloud.mongodb.com');
console.log('2. Go to Database Access');
console.log('3. Reset password for user: nafiskamal2000');
console.log('4. Enter the new password below\n');

rl.question('Enter your new MongoDB Atlas password: ', (newPassword) => {
  const envContent = `MONGODB_URI=mongodb+srv://nafiskamal2000:${newPassword}@cluster0.losfb4v.mongodb.net/photographerlagbe?retryWrites=true&w=majority
JWT_SECRET=photographerlagbe_super_secret_jwt_key_2024
PORT=5000
NODE_ENV=development`;

  fs.writeFileSync('.env', envContent);
  console.log('\n✅ .env file updated successfully!');
  console.log('🔄 Please restart your server: node server.js');
  rl.close();
}); 