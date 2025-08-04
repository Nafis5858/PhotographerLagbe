const fs = require('fs');

const envContent = `MONGODB_URI=mongodb+srv://nafiskamal2000:nafis@cluster0.losfb4v.mongodb.net/photographerlagbe?retryWrites=true&w=majority
JWT_SECRET=photographerlagbe_super_secret_jwt_key_2024
PORT=5000
NODE_ENV=development`;

fs.writeFileSync('.env', envContent);
console.log('✅ .env file created successfully!');
console.log('📝 Please check your MongoDB Atlas password and update if needed.'); 