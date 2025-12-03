require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/adventurous-travel';

async function makeAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas\n');

    // Update admin@adventurous.com to admin role
    const result = await User.findOneAndUpdate(
      { email: 'admin@adventurous.com' },
      { role: 'admin' },
      { new: true }
    );

    if (result) {
      console.log('✅ User updated to admin:\n');
      console.log(`   Email: ${result.email}`);
      console.log(`   Name: ${result.name}`);
      console.log(`   Role: ${result.role}`);
      console.log('\n🔐 Admin credentials:');
      console.log('   Email: admin@adventurous.com');
      console.log('   Password: Admin123!\n');
    } else {
      console.log('❌ User not found\n');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

makeAdmin();
