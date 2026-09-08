import Location from '../models/Location.js';

export const defaultMockLocations = [
  {
    businessName: 'Apex Dental Care & Implant Center',
    address: '452 Downtown Plaza, Suite 104',
    city: 'New York',
    category: 'Dental Clinic',
    phone: '+1 (212) 555-0199',
    website: 'https://apexdentalcare.example.com',
    isDefault: true,
  },
  {
    businessName: 'Urban Artisan Roast Coffee',
    address: '88 Market St, Midtown East',
    city: 'San Francisco',
    category: 'Coffee Shop & Bakery',
    phone: '+1 (415) 555-0142',
    website: 'https://urbanroastcoffee.example.com',
    isDefault: false,
  },
  {
    businessName: 'Pulse Fitness & Recovery Club',
    address: '1204 Sunset Blvd, Westside',
    city: 'Los Angeles',
    category: 'Fitness Center & Gym',
    phone: '+1 (310) 555-0178',
    website: 'https://pulsefitnessclub.example.com',
    isDefault: false,
  },
];

export const seedUserLocationsIfEmpty = async (userId) => {
  try {
    const count = await Location.countDocuments({ userId });
    if (count === 0) {
      const locationsToInsert = defaultMockLocations.map((loc) => ({
        ...loc,
        userId,
      }));
      await Location.insertMany(locationsToInsert);
      console.log(`🌱 Auto-seeded ${locationsToInsert.length} mock GBP locations for user ${userId}`);
    }
  } catch (error) {
    console.error('Error seeding locations:', error.message);
  }
};
