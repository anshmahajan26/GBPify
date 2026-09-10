import Location from '../models/Location.js';

// @desc    Get all locations for the authenticated user
// @route   GET /api/locations
export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find({ userId: req.user._id }).sort({ createdAt: -1 });
    return res.json({
      success: true,
      count: locations.length,
      data: locations,
    });
  } catch (error) {
    console.error('Error fetching locations:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching locations' });
  }
};

// @desc    Get a single location by ID
// @route   GET /api/locations/:id
export const getLocationById = async (req, res) => {
  try {
    const location = await Location.findOne({ _id: req.params.id, userId: req.user._id });
    if (!location) {
      return res.status(404).json({ success: false, message: 'Location not found' });
    }
    return res.json({
      success: true,
      data: location,
    });
  } catch (error) {
    console.error('Error fetching location:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching location' });
  }
};

// @desc    Create a new business location
// @route   POST /api/locations
export const createLocation = async (req, res) => {
  try {
    const { businessName, address, city, category, phone, website } = req.body;

    if (!businessName || !address || !city || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide business name, address, city, and category',
      });
    }

    const location = await Location.create({
      userId: req.user._id,
      businessName,
      address,
      city,
      category,
      phone: phone || '',
      website: website || '',
    });

    return res.status(201).json({
      success: true,
      data: location,
    });
  } catch (error) {
    console.error('Error creating location:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error creating location' });
  }
};

// @desc    Delete a location
// @route   DELETE /api/locations/:id
export const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!location) {
      return res.status(404).json({ success: false, message: 'Location not found' });
    }
    return res.json({
      success: true,
      message: 'Location deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting location:', error);
    return res.status(500).json({ success: false, message: 'Server error deleting location' });
  }
};
