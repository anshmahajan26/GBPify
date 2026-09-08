import express from 'express';
import {
  getLocations,
  getLocationById,
  createLocation,
  deleteLocation,
} from '../controllers/locationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All location routes are protected

router.route('/').get(getLocations).post(createLocation);
router.route('/:id').get(getLocationById).delete(deleteLocation);

export default router;
