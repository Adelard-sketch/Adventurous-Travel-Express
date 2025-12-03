require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/adventurous-travel';

async function checkUsers() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas\n');

    const users = await User.find({}).select('email name role isAdmin');
    
    console.log('╔════════════════════════════════════════╗');
    console.log('║         ALL USERS IN DATABASE          ║');
    console.log('╚════════════════════════════════════════╝\n');

    if (users.length === 0) {
      console.log('❌ No users found in database\n');
    } else {
      users.forEach((user, index) => {
        console.log(`${index + 1}. Email: ${user.email}`);
        console.log(`   Name: ${user.name || 'N/A'}`);
        console.log(`   Role: ${user.role || 'N/A'}`);
        console.log(`   IsAdmin: ${user.isAdmin || false}`);
        console.log('');
      });
    }

    console.log(`Total users: ${users.length}\n`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

checkUsers();
