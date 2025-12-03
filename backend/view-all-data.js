require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/adventurous-travel';

async function viewAllData() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas\n');

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    console.log('╔════════════════════════════════════════╗');
    console.log('║     DATABASE CONTENTS SUMMARY          ║');
    console.log('╚════════════════════════════════════════╝\n');

    for (const collInfo of collections) {
      const collName = collInfo.name;
      const count = await db.collection(collName).countDocuments();
      
      const icon = {
        'users': '👤',
        'bookings': '📅',
        'hotels': '🏨',
        'flights': '✈️',
        'tours': '🎒',
        'parks': '🏞️',
        'locations': '📍',
        'taxis': '🚗',
        'payments': '💳'
      }[collName] || '📄';
      
      console.log(`${icon} ${collName.padEnd(15)} ${count} items`);
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('🌐 View in MongoDB Atlas:');
    console.log('   https://cloud.mongodb.com\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

viewAllData();
