require('dotenv').config();
const mongoose = require('mongoose');
const Park = require('./models/park');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/adventurous-travel';

const parks = [
  {
    name: 'Serengeti National Park',
    description: 'One of Africa\'s most famous parks, known for the annual wildebeest migration. Home to the Big Five and countless other species across vast savannas.',
    country: 'Tanzania',
    location: { 
      type: 'Point', 
      coordinates: [34.8333, -2.3333] 
    },
    entryFee: 70,
    capacity: 500,
    openHours: '6:00 AM - 6:00 PM',
    features: ['Safari Drives', 'Camping', 'Wildlife Photography', 'Hot Air Balloon Rides'],
    images: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801',
      'https://images.unsplash.com/photo-1534177616072-ef7dc120449d'
    ],
    activities: ['Game Drives', 'Walking Safaris', 'Bird Watching', 'Photography Tours'],
    rating: 4.9,
    reviews: 2847,
    bookingsCount: 1523
  },
  {
    name: 'Kruger National Park',
    description: 'South Africa\'s largest game reserve, offering unparalleled safari experiences with diverse wildlife and excellent infrastructure.',
    country: 'South Africa',
    location: { 
      type: 'Point', 
      coordinates: [31.5522, -24.0094] 
    },
    entryFee: 25,
    capacity: 600,
    openHours: '5:30 AM - 6:30 PM',
    features: ['Self-Drive Safaris', 'Rest Camps', 'Guided Tours', 'Bush Walks'],
    images: [
      'https://images.unsplash.com/photo-1535338454770-eb72ca23f8e4',
      'https://images.unsplash.com/photo-1547970810-dc1eac37d174'
    ],
    activities: ['Self-Drive Safari', 'Guided Game Drives', 'Bush Walks', 'Night Drives'],
    rating: 4.8,
    reviews: 3156,
    bookingsCount: 2341
  },
  {
    name: 'Yellowstone National Park',
    description: 'America\'s first national park featuring dramatic geothermal features, including Old Faithful geyser, colorful hot springs, and abundant wildlife.',
    country: 'United States',
    location: { 
      type: 'Point', 
      coordinates: [-110.5885, 44.4280] 
    },
    entryFee: 35,
    capacity: 800,
    openHours: 'Open 24 hours (some roads seasonal)',
    features: ['Geysers', 'Hot Springs', 'Hiking Trails', 'Wildlife Viewing'],
    images: [
      'https://images.unsplash.com/photo-1490971524970-4a1bb0d3b562',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'
    ],
    activities: ['Hiking', 'Wildlife Photography', 'Geyser Watching', 'Camping'],
    rating: 4.9,
    reviews: 5234,
    bookingsCount: 3876
  },
  {
    name: 'Banff National Park',
    description: 'Canada\'s oldest national park, featuring stunning Rocky Mountain scenery, turquoise lakes, and world-class skiing and hiking.',
    country: 'Canada',
    location: { 
      type: 'Point', 
      coordinates: [-115.5708, 51.4968] 
    },
    entryFee: 10,
    capacity: 700,
    openHours: 'Open 24 hours',
    features: ['Mountain Lakes', 'Ski Resorts', 'Hot Springs', 'Hiking Trails'],
    images: [
      'https://images.unsplash.com/photo-1503614472-8c93d56e92ce',
      'https://images.unsplash.com/photo-1526772662000-3f88f10405ff'
    ],
    activities: ['Hiking', 'Skiing', 'Canoeing', 'Wildlife Viewing', 'Hot Springs'],
    rating: 4.9,
    reviews: 4567,
    bookingsCount: 3245
  },
  {
    name: 'Torres del Paine National Park',
    description: 'Chilean Patagonia\'s crown jewel, featuring dramatic granite peaks, glaciers, turquoise lakes, and diverse wildlife.',
    country: 'Chile',
    location: { 
      type: 'Point', 
      coordinates: [-73.0903, -50.9423] 
    },
    entryFee: 30,
    capacity: 400,
    openHours: '8:30 AM - 8:00 PM (summer)',
    features: ['Glacier Viewing', 'Mountain Peaks', 'Trekking Routes', 'Wildlife'],
    images: [
      'https://images.unsplash.com/photo-1531068458965-1d2b1e3c0e5f',
      'https://images.unsplash.com/photo-1544376798-89aa6b82c6cd'
    ],
    activities: ['Trekking', 'Glacier Hiking', 'Wildlife Photography', 'Camping'],
    rating: 4.9,
    reviews: 2134,
    bookingsCount: 1567
  },
  {
    name: 'Fiordland National Park',
    description: 'New Zealand\'s largest national park, home to the famous Milford Sound with dramatic fjords, waterfalls, and rainforests.',
    country: 'New Zealand',
    location: { 
      type: 'Point', 
      coordinates: [167.7264, -45.4167] 
    },
    entryFee: 0,
    capacity: 500,
    openHours: 'Open 24 hours',
    features: ['Fjords', 'Waterfalls', 'Rainforests', 'Hiking Tracks'],
    images: [
      'https://images.unsplash.com/photo-1507699622108-4be3abd695ad',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'
    ],
    activities: ['Cruising', 'Hiking', 'Kayaking', 'Scenic Flights'],
    rating: 4.9,
    reviews: 3456,
    bookingsCount: 2789
  },
  {
    name: 'Plitvice Lakes National Park',
    description: 'Croatia\'s most famous park featuring 16 terraced lakes connected by spectacular waterfalls, surrounded by lush forests.',
    country: 'Croatia',
    location: { 
      type: 'Point', 
      coordinates: [15.6214, 44.8654] 
    },
    entryFee: 30,
    capacity: 450,
    openHours: '7:00 AM - 8:00 PM (summer)',
    features: ['Waterfalls', 'Wooden Walkways', 'Boat Rides', 'Crystal Lakes'],
    images: [
      'https://images.unsplash.com/photo-1591604021695-0c69b7c05981',
      'https://images.unsplash.com/photo-1589553416260-f586c8f1514f'
    ],
    activities: ['Walking Tours', 'Boat Rides', 'Photography', 'Swimming'],
    rating: 4.8,
    reviews: 4123,
    bookingsCount: 3567
  },
  {
    name: 'Zhangjiajie National Forest Park',
    description: 'China\'s famous Avatar Mountains with towering sandstone pillars, glass bridges, and breathtaking cable car rides.',
    country: 'China',
    location: { 
      type: 'Point', 
      coordinates: [110.4431, 29.1170] 
    },
    entryFee: 35,
    capacity: 600,
    openHours: '7:00 AM - 6:00 PM',
    features: ['Sandstone Pillars', 'Glass Bridge', 'Cable Cars', 'Scenic Elevators'],
    images: [
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d',
      'https://images.unsplash.com/photo-1542960950-7ff20f486e3f'
    ],
    activities: ['Cable Car Rides', 'Hiking', 'Glass Bridge Walk', 'Photography'],
    rating: 4.8,
    reviews: 5678,
    bookingsCount: 4234
  },
  {
    name: 'Iguazu National Park',
    description: 'Home to the magnificent Iguazu Falls, one of the world\'s largest waterfall systems on the Argentina-Brazil border.',
    country: 'Argentina',
    location: { 
      type: 'Point', 
      coordinates: [-54.4367, -25.6953] 
    },
    entryFee: 20,
    capacity: 550,
    openHours: '8:00 AM - 6:00 PM',
    features: ['Waterfalls', 'Rainforest', 'Wildlife', 'Walkways'],
    images: [
      'https://images.unsplash.com/photo-1518639192441-8fce0a366e2e',
      'https://images.unsplash.com/photo-1609137144813-7d9921338f24'
    ],
    activities: ['Waterfall Tours', 'Boat Rides', 'Wildlife Spotting', 'Photography'],
    rating: 4.9,
    reviews: 4789,
    bookingsCount: 3891
  },
  {
    name: 'Swiss National Park',
    description: 'Switzerland\'s oldest national park in the Alps, offering pristine alpine landscapes, diverse flora and fauna, and excellent hiking.',
    country: 'Switzerland',
    location: { 
      type: 'Point', 
      coordinates: [10.2167, 46.6833] 
    },
    entryFee: 0,
    capacity: 350,
    openHours: 'June - October: 5:00 AM - 10:00 PM',
    features: ['Alpine Meadows', 'Mountain Peaks', 'Wildlife', 'Hiking Trails'],
    images: [
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'
    ],
    activities: ['Hiking', 'Wildlife Observation', 'Photography', 'Nature Walks'],
    rating: 4.7,
    reviews: 2345,
    bookingsCount: 1876
  },
  {
    name: 'Komodo National Park',
    description: 'Indonesian archipelago famous for Komodo dragons, pristine beaches, and world-class diving with vibrant coral reefs.',
    country: 'Indonesia',
    location: { 
      type: 'Point', 
      coordinates: [119.4908, -8.5569] 
    },
    entryFee: 150,
    capacity: 300,
    openHours: '8:00 AM - 5:00 PM',
    features: ['Komodo Dragons', 'Pink Beach', 'Diving Sites', 'Island Hopping'],
    images: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
      'https://images.unsplash.com/photo-1583945274527-611cff838ea8'
    ],
    activities: ['Dragon Spotting', 'Snorkeling', 'Diving', 'Beach Visits'],
    rating: 4.8,
    reviews: 1987,
    bookingsCount: 1456
  },
  {
    name: 'Great Barrier Reef Marine Park',
    description: 'World\'s largest coral reef system, offering unparalleled diving, snorkeling, and marine life encounters off Australia\'s coast.',
    country: 'Australia',
    location: { 
      type: 'Point', 
      coordinates: [147.6992, -18.2871] 
    },
    entryFee: 6,
    capacity: 400,
    openHours: 'Open 24 hours (tours vary)',
    features: ['Coral Reefs', 'Marine Life', 'Island Resorts', 'Glass Bottom Boats'],
    images: [
      'https://images.unsplash.com/photo-1582967788606-a171c1080cb0',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19'
    ],
    activities: ['Scuba Diving', 'Snorkeling', 'Island Tours', 'Glass Bottom Boat'],
    rating: 4.9,
    reviews: 6789,
    bookingsCount: 5234
  }
];

async function seedParks() {
  try {
    console.log('🌱 Starting park seeding...\n');
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB Connected\n');

    // Clear existing parks
    console.log('🗑️  Clearing existing parks...');
    await Park.deleteMany({});
    console.log('✅ Existing parks cleared\n');

    // Insert parks
    for (const park of parks) {
      const created = await Park.create(park);
      console.log(`✅ Created: ${created.name}`);
      console.log(`   Country: ${created.country} | Entry Fee: $${created.entryFee}`);
      console.log(`   Rating: ${created.rating}⭐ | Reviews: ${created.reviews}\n`);
    }

    console.log(`🎉 Successfully seeded ${parks.length} parks!\n`);
    
    console.log('📊 Summary:');
    console.log(`   Total parks: ${parks.length}`);
    console.log(`   Countries: ${[...new Set(parks.map(p => p.country))].length}`);
    console.log(`   Average rating: ${(parks.reduce((sum, p) => sum + p.rating, 0) / parks.length).toFixed(1)}⭐`);
    console.log(`   Total capacity: ${parks.reduce((sum, p) => sum + p.capacity, 0)}`);
    
  } catch (error) {
    console.error('❌ Error seeding parks:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    process.exit(0);
  }
}

seedParks();
