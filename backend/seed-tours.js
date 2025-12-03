require('dotenv').config();
const mongoose = require('mongoose');
const Tour = require('./models/tour');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/adventurous-travel';

const tours = [
  {
    title: 'African Safari Adventure',
    description: 'Experience the thrill of a lifetime with our 7-day African Safari tour. Witness the Big Five in their natural habitat, enjoy luxury accommodations, and create unforgettable memories.',
    price: 2499,
    durationDays: 7,
    startLocations: ['Durban, South Africa'],
    images: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801',
      'https://images.unsplash.com/photo-1534177616072-ef7dc120449d'
    ],
    capacity: 12,
    availableDates: [
      { date: new Date('2025-12-15'), seatsLeft: 8 },
      { date: new Date('2026-01-10'), seatsLeft: 12 },
      { date: new Date('2026-02-05'), seatsLeft: 10 }
    ],
    tags: ['Safari', 'Wildlife', 'Adventure', 'Photography', 'Luxury']
  },
  {
    title: 'Great Wall of China Trek',
    description: 'Hike the iconic Great Wall of China on this 5-day adventure. Explore ancient fortifications, visit local villages, and experience authentic Chinese culture.',
    price: 1899,
    durationDays: 5,
    startLocations: ['Beijing, China'],
    images: [
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d',
      'https://images.unsplash.com/photo-1545640222-1e7f00ae5fa9'
    ],
    capacity: 15,
    availableDates: [
      { date: new Date('2025-12-20'), seatsLeft: 15 },
      { date: new Date('2026-01-15'), seatsLeft: 12 },
      { date: new Date('2026-02-10'), seatsLeft: 15 }
    ],
    tags: ['Hiking', 'Culture', 'History', 'Adventure', 'Photography']
  },
  {
    title: 'Egyptian Pyramids & Nile Cruise',
    description: 'Journey through ancient Egypt with visits to the Pyramids, Sphinx, and a luxurious 4-day Nile cruise. Includes expert Egyptologist guides.',
    price: 2199,
    durationDays: 8,
    startLocations: ['Cairo, Egypt'],
    images: [
      'https://images.unsplash.com/photo-1572252009286-268acec5ca0a',
      'https://images.unsplash.com/photo-1568322445389-f64ac2515020'
    ],
    capacity: 20,
    availableDates: [
      { date: new Date('2025-12-18'), seatsLeft: 18 },
      { date: new Date('2026-01-08'), seatsLeft: 20 },
      { date: new Date('2026-02-12'), seatsLeft: 15 }
    ],
    tags: ['History', 'Culture', 'Cruise', 'Luxury', 'Ancient']
  },
  {
    title: 'Amazon Rainforest Expedition',
    description: 'Explore the world\'s largest rainforest on this 6-day expedition. Spot exotic wildlife, visit indigenous communities, and discover hidden waterfalls.',
    price: 1799,
    durationDays: 6,
    startLocations: ['Manaus, Brazil'],
    images: [
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5',
      'https://images.unsplash.com/photo-1588412079929-790b9f593d8e'
    ],
    capacity: 10,
    availableDates: [
      { date: new Date('2025-12-22'), seatsLeft: 8 },
      { date: new Date('2026-01-12'), seatsLeft: 10 },
      { date: new Date('2026-02-08'), seatsLeft: 9 }
    ],
    tags: ['Rainforest', 'Wildlife', 'Adventure', 'Eco-Tourism', 'Photography']
  },
  {
    title: 'Northern Lights Iceland',
    description: 'Chase the magical Northern Lights in Iceland. Includes glacier hiking, hot springs, and stunning volcanic landscapes on this 5-day winter adventure.',
    price: 2299,
    durationDays: 5,
    startLocations: ['Reykjavik, Iceland'],
    images: [
      'https://images.unsplash.com/photo-1579033461380-adb47c3eb938',
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7'
    ],
    capacity: 14,
    availableDates: [
      { date: new Date('2025-12-25'), seatsLeft: 12 },
      { date: new Date('2026-01-20'), seatsLeft: 14 },
      { date: new Date('2026-02-15'), seatsLeft: 10 }
    ],
    tags: ['Northern Lights', 'Winter', 'Glacier', 'Photography', 'Adventure']
  },
  {
    title: 'Machu Picchu & Sacred Valley',
    description: 'Trek to the lost city of Machu Picchu through the Sacred Valley. Experience Incan culture, stunning mountain vistas, and ancient ruins on this 7-day tour.',
    price: 2099,
    durationDays: 7,
    startLocations: ['Cusco, Peru'],
    images: [
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1',
      'https://images.unsplash.com/photo-1526392060635-9d6019884377'
    ],
    capacity: 16,
    availableDates: [
      { date: new Date('2025-12-28'), seatsLeft: 14 },
      { date: new Date('2026-01-18'), seatsLeft: 16 },
      { date: new Date('2026-02-20'), seatsLeft: 12 }
    ],
    tags: ['Trekking', 'History', 'Mountains', 'Culture', 'Adventure']
  },
  {
    title: 'Japanese Cherry Blossom Tour',
    description: 'Witness Japan\'s iconic cherry blossoms in full bloom. Visit ancient temples, traditional gardens, and modern cities on this 8-day cultural journey.',
    price: 2799,
    durationDays: 8,
    startLocations: ['Tokyo, Japan'],
    images: [
      'https://images.unsplash.com/photo-1522383225653-ed111181a951',
      'https://images.unsplash.com/photo-1528164344705-47542687000d'
    ],
    capacity: 18,
    availableDates: [
      { date: new Date('2026-03-25'), seatsLeft: 18 },
      { date: new Date('2026-04-05'), seatsLeft: 16 },
      { date: new Date('2026-04-15'), seatsLeft: 18 }
    ],
    tags: ['Culture', 'Cherry Blossom', 'Gardens', 'History', 'Photography']
  },
  {
    title: 'Greek Islands Sailing Adventure',
    description: 'Sail the stunning Greek Islands on a luxury yacht. Explore hidden coves, ancient ruins, and enjoy authentic Mediterranean cuisine on this 7-day voyage.',
    price: 2599,
    durationDays: 7,
    startLocations: ['Athens, Greece'],
    images: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077',
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e'
    ],
    capacity: 12,
    availableDates: [
      { date: new Date('2026-05-10'), seatsLeft: 12 },
      { date: new Date('2026-06-05'), seatsLeft: 10 },
      { date: new Date('2026-07-01'), seatsLeft: 12 }
    ],
    tags: ['Sailing', 'Islands', 'Beach', 'Culture', 'Luxury']
  },
  {
    title: 'Patagonia Wilderness Trek',
    description: 'Trek through the breathtaking landscapes of Patagonia. Witness glaciers, turquoise lakes, and dramatic mountain peaks on this 9-day expedition.',
    price: 2899,
    durationDays: 9,
    startLocations: ['Bariloche, Argentina'],
    images: [
      'https://images.unsplash.com/photo-1531068458965-1d2b1e3c0e5f',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29'
    ],
    capacity: 10,
    availableDates: [
      { date: new Date('2026-01-15'), seatsLeft: 10 },
      { date: new Date('2026-02-10'), seatsLeft: 8 },
      { date: new Date('2026-03-05'), seatsLeft: 10 }
    ],
    tags: ['Trekking', 'Mountains', 'Glacier', 'Adventure', 'Wilderness']
  },
  {
    title: 'Dubai Desert Safari & City Tour',
    description: 'Experience the contrast of modern Dubai and ancient desert traditions. Includes luxury hotel, desert safari, dune bashing, and camel rides.',
    price: 1699,
    durationDays: 5,
    startLocations: ['Dubai, UAE'],
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090'
    ],
    capacity: 20,
    availableDates: [
      { date: new Date('2025-12-30'), seatsLeft: 18 },
      { date: new Date('2026-01-25'), seatsLeft: 20 },
      { date: new Date('2026-02-22'), seatsLeft: 16 }
    ],
    tags: ['Desert', 'Luxury', 'Culture', 'Adventure', 'Modern']
  }
];

async function seedTours() {
  try {
    console.log('🌱 Starting tour seeding...\n');
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB Connected\n');

    // Drop existing indexes to avoid geospatial issues
    try {
      await Tour.collection.dropIndexes();
      console.log('✅ Dropped old indexes\n');
    } catch (err) {
      console.log('ℹ️  No indexes to drop\n');
    }

    // Clear existing tours
    console.log('🗑️  Clearing existing tours...');
    await Tour.deleteMany({});
    console.log('✅ Existing tours cleared\n');

    // Insert tours
    for (const tour of tours) {
      const created = await Tour.create(tour);
      console.log(`✅ Created: ${created.title}`);
      console.log(`   Duration: ${created.durationDays} days | Price: $${created.price}`);
      console.log(`   Capacity: ${created.capacity} | Available dates: ${created.availableDates.length}\n`);
    }

    console.log(`🎉 Successfully seeded ${tours.length} tours!\n`);
    
    console.log('📊 Summary:');
    console.log(`   Total tours: ${tours.length}`);
    console.log(`   Price range: $${Math.min(...tours.map(t => t.price))} - $${Math.max(...tours.map(t => t.price))}`);
    console.log(`   Total capacity: ${tours.reduce((sum, t) => sum + t.capacity, 0)}`);
    
  } catch (error) {
    console.error('❌ Error seeding tours:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    process.exit(0);
  }
}

seedTours();
