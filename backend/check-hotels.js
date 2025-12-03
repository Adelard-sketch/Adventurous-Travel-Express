require('dotenv').config();
const mongoose = require('mongoose');
const Hotel = require('./models/hotel');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/adventurous-travel';

async function checkHotels() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB Connected\n');

    const hotels = await Hotel.find({});
    console.log(`Found ${hotels.length} hotels in database:\n`);
    
    hotels.forEach((hotel, index) => {
      console.log(`${index + 1}. ${hotel.name} - ${hotel.city} ($${hotel.pricePerNight}/night)`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

checkHotels();
