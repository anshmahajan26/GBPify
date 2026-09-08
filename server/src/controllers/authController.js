import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { seedUserLocationsIfEmpty } from '../utils/seedData.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'super_secret_gbp_jwt_token_key_2026_secure', {
    expiresIn: '30d',
  });
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const COMMON_TYPO_DOMAINS = {
  'gmil.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gmial.com': 'gmail.com',
  'gmaill.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gmeil.com': 'gmail.com',
  'yaho.com': 'yahoo.com',
  'yahooo.com': 'yahoo.com',
  'ymail.con': 'ymail.com',
  'hotmial.com': 'hotmail.com',
  'hotmai.com': 'hotmail.com',
  'outlok.com': 'outlook.com',
  'outloo.com': 'outlook.com',
  'iclud.com': 'icloud.com',
  'icoud.com': 'icloud.com',
};

export const validateEmailAddress = (rawEmail) => {
  if (!rawEmail || typeof rawEmail !== 'string') {
    return { valid: false, message: 'Email address is required' };
  }
  const cleanEmail = rawEmail.trim().toLowerCase();
  if (!EMAIL_REGEX.test(cleanEmail)) {
    return { valid: false, message: 'Please enter a valid email format (e.g. name@example.com)' };
  }
  const parts = cleanEmail.split('@');
  const domain = parts[1];
  if (COMMON_TYPO_DOMAINS[domain]) {
    return {
      valid: false,
      message: `Invalid email domain '@${domain}'. Did you mean '@${COMMON_TYPO_DOMAINS[domain]}'?`,
    };
  }
  return { valid: true, email: cleanEmail };
};

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const emailCheck = validateEmailAddress(email);
    if (!emailCheck.valid) {
      return res.status(400).json({ success: false, message: emailCheck.message });
    }
    const cleanEmail = emailCheck.email;

    const userExists = await User.findOne({ email: cleanEmail });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      password,
    });

    // Seed mock locations for immediate testing
    await seedUserLocationsIfEmpty(user._id);

    return res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error during registration' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please enter both email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await user.matchPassword(password))) {
      await seedUserLocationsIfEmpty(user._id);

      return res.json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        },
      });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error during login' });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    return res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch user profile' });
  }
};
