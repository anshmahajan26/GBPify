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
  {
    businessName: 'Vanguard Personal Injury Law Group',
    address: '200 W Madison St, Suite 1800',
    city: 'Chicago',
    category: 'Law Firm & Legal Services',
    phone: '+1 (312) 555-0188',
    website: 'https://vanguardlawgroup.example.com',
    isDefault: false,
  },
  {
    businessName: 'Precision German Auto Repair & Tuning',
    address: '1405 E Riverside Dr',
    city: 'Austin',
    category: 'Auto Repair & Service',
    phone: '+1 (512) 555-0164',
    website: 'https://precisiongermanauto.example.com',
    isDefault: false,
  },
  {
    businessName: 'Serenity Haven Luxury Day Spa',
    address: '740 Ocean Drive, Suite 2B',
    city: 'Miami',
    category: 'Day Spa & Wellness',
    phone: '+1 (305) 555-0155',
    website: 'https://serenityhavenspa.example.com',
    isDefault: false,
  },
  {
    businessName: 'Trattoria Bella Napoli & Wine Bar',
    address: '312 Hanover St, North End',
    city: 'Boston',
    category: 'Italian Restaurant',
    phone: '+1 (617) 555-0122',
    website: 'https://bellanapoliboston.example.com',
    isDefault: false,
  },
  {
    businessName: 'ProActive Plumbing & HVAC Solutions',
    address: '4900 1st Ave S',
    city: 'Seattle',
    category: 'HVAC & Plumbing Services',
    phone: '+1 (206) 555-0137',
    website: 'https://proactivehvacseattle.example.com',
    isDefault: false,
  },
  {
    businessName: 'Skyline Modern Realty Group',
    address: '1700 Lincoln St, Suite 2200',
    city: 'Denver',
    category: 'Real Estate Agency',
    phone: '+1 (303) 555-0111',
    website: 'https://skylinedenverhomes.example.com',
    isDefault: false,
  },
  {
    businessName: 'Paws & Claws Veterinary Hospital',
    address: '2240 Camino Del Rio N',
    city: 'San Diego',
    category: 'Veterinary Clinic & Animal Hospital',
    phone: '+1 (619) 555-0193',
    website: 'https://pawsclawsvetsd.example.com',
    isDefault: false,
  },
];

export const seedUserLocationsIfEmpty = async (userId) => {
  try {
    const existing = await Location.find({ userId });
    const existingNames = new Set(existing.map((l) => l.businessName.toLowerCase()));

    const missingLocations = defaultMockLocations
      .filter((loc) => !existingNames.has(loc.businessName.toLowerCase()))
      .map((loc, idx) => ({
        ...loc,
        userId,
        isDefault: existing.length === 0 && idx === 0,
      }));

    if (missingLocations.length > 0) {
      await Location.insertMany(missingLocations);
      console.log(`🌱 Seeded ${missingLocations.length} locations for user ${userId}`);
    }
  } catch (error) {
    console.error('Error seeding locations:', error.message);
  }
};
