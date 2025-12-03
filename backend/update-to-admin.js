// Quick script to update user to admin in production
const mongoose = require('mongoose');
const User = require('./models/user');

async function updateToAdmin() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'your-mongodb-atlas-connection-string';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB Atlas');

    const user = await User.findOne({ email: 'admin@adventurous.com' });
    
    if (!user) {
      console.log('User not found');
      process.exit(1);
    }

    user.role = 'admin';
    await user.save();
    
    console.log('✅ User updated to admin successfully!');
    console.log(`Email: ${user.email}`);
    console.log(`Role: ${user.role}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

updateToAdmin();
