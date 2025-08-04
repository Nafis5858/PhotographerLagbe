const express = require('express');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const Photographer = require('../models/Photographer');
const User = require('../models/User');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client/public/uploads/portfolio');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Error: File upload only supports the following filetypes - ' + filetypes));
  }
});

// @route   POST /api/photographers/profile
// @desc    Create photographer profile
// @access  Private (Photographers only)
router.post('/profile', [
  auth,
  authorize('photographer'),
  body('businessName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Business name must be between 2 and 100 characters'),
  body('bio')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Bio must be between 10 and 1000 characters'),
  body('specializations')
    .isArray({ min: 1 })
    .withMessage('At least one specialization is required'),
  body('experience')
    .isInt({ min: 0, max: 50 })
    .withMessage('Experience must be between 0 and 50 years'),
  body('hourlyRate')
    .isFloat({ min: 0 })
    .withMessage('Hourly rate must be a positive number'),
  body('location.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('location.state')
    .trim()
    .notEmpty()
    .withMessage('State is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    // Check if photographer profile already exists
    const existingProfile = await Photographer.findOne({ user: req.user.id });
    if (existingProfile) {
      return res.status(400).json({ message: 'Photographer profile already exists' });
    }

    const {
      businessName,
      bio,
      specializations,
      experience,
      hourlyRate,
      location,
      equipment = [],
      socialMedia = {}
    } = req.body;

    // Create photographer profile
    const photographer = new Photographer({
      user: req.user.id,
      businessName,
      bio,
      specializations,
      experience,
      hourlyRate,
      location,
      equipment,
      socialMedia
    });

    await photographer.save();

    // Populate user details
    await photographer.populate('user', 'name email phone profilePicture');

    res.status(201).json({
      message: 'Photographer profile created successfully',
      photographer
    });

  } catch (error) {
    console.error('Create profile error:', error);
    res.status(500).json({ message: 'Server error creating profile' });
  }
});

// @route   GET /api/photographers/profile
// @desc    Get current user's photographer profile
// @access  Private (Photographers only)
router.get('/profile', auth, authorize('photographer'), async (req, res) => {
  try {
    const photographer = await Photographer.findOne({ user: req.user.id })
      .populate('user', 'name email phone profilePicture');

    if (!photographer) {
      return res.status(404).json({ message: 'Photographer profile not found' });
    }

    res.json({ photographer });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error getting profile' });
  }
});

// @route   PUT /api/photographers/profile
// @desc    Update photographer profile
// @access  Private (Photographers only)
router.put('/profile', [
  auth,
  authorize('photographer'),
  body('businessName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Business name must be between 2 and 100 characters'),
  body('bio')
    .optional()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Bio must be between 10 and 1000 characters'),
  body('specializations')
    .optional()
    .isArray({ min: 1 })
    .withMessage('At least one specialization is required'),
  body('experience')
    .optional()
    .isInt({ min: 0, max: 50 })
    .withMessage('Experience must be between 0 and 50 years'),
  body('hourlyRate')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Hourly rate must be a positive number')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const photographer = await Photographer.findOne({ user: req.user.id });
    if (!photographer) {
      return res.status(404).json({ message: 'Photographer profile not found' });
    }

    // Update fields
    const updateFields = ['businessName', 'bio', 'specializations', 'experience', 'hourlyRate', 'location', 'equipment', 'socialMedia'];
    updateFields.forEach(field => {
      if (req.body[field] !== undefined) {
        photographer[field] = req.body[field];
      }
    });

    photographer.updatedAt = Date.now();
    await photographer.save();

    await photographer.populate('user', 'name email phone profilePicture');

    res.json({
      message: 'Profile updated successfully',
      photographer
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error updating profile' });
  }
});

// @route   POST /api/photographers/upload-work
// @desc    Upload a new work to the portfolio
// @access  Private (Photographers only)
router.post(
  '/upload-work',
  [auth, authorize('photographer'), upload.single('image')],
  async (req, res) => {
    try {
      const photographer = await Photographer.findOne({ user: req.user.id });
      if (!photographer) {
        return res.status(404).json({ message: 'Photographer profile not found' });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'Image file is required' });
      }

      const { category } = req.body;
      const imageUrl = `/uploads/portfolio/${req.file.filename}`;

      const newWork = {
        title: req.body.title || 'Untitled',
        description: req.body.description || '',
        imageUrl,
        category,
      };

      photographer.portfolio.unshift(newWork);
      await photographer.save();

      res.status(201).json({
        message: 'Work uploaded successfully',
        portfolio: photographer.portfolio,
      });
    } catch (error) {
      console.error('Upload work error:', error);
      res.status(500).json({ message: 'Server error during upload' });
    }
  }
);

// @route   DELETE /api/photographers/portfolio/:itemId
// @desc    Remove portfolio item
// @access  Private (Photographers only)
router.delete('/portfolio/:itemId', auth, authorize('photographer'), async (req, res) => {
  try {
    const photographer = await Photographer.findOne({ user: req.user.id });
    if (!photographer) {
      return res.status(404).json({ message: 'Photographer profile not found' });
    }

    const itemIndex = photographer.portfolio.findIndex(
      item => item._id.toString() === req.params.itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }

    photographer.portfolio.splice(itemIndex, 1);
    await photographer.save();

    res.json({ message: 'Portfolio item removed successfully' });

  } catch (error) {
    console.error('Remove portfolio error:', error);
    res.status(500).json({ message: 'Server error removing portfolio item' });
  }
});

// @route   GET /api/photographers
// @desc    Get all photographers (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      city, 
      specialization, 
      minRate, 
      maxRate,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = { isActive: true };
    if (city) filter['location.city'] = new RegExp(city, 'i');
    if (specialization) filter.specializations = specialization;
    if (minRate || maxRate) {
      filter.hourlyRate = {};
      if (minRate) filter.hourlyRate.$gte = parseFloat(minRate);
      if (maxRate) filter.hourlyRate.$lte = parseFloat(maxRate);
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const photographers = await Photographer.find(filter)
      .populate('user', 'name email phone profilePicture')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Photographer.countDocuments(filter);

    res.json({
      photographers,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (error) {
    console.error('Get photographers error:', error);
    res.status(500).json({ message: 'Server error getting photographers' });
  }
});

// @route   GET /api/photographers/:id
// @desc    Get photographer by ID (public)
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const photographer = await Photographer.findById(req.params.id)
      .populate('user', 'name email phone profilePicture');

    if (!photographer) {
      return res.status(404).json({ message: 'Photographer not found' });
    }

    if (!photographer.isActive) {
      return res.status(404).json({ message: 'Photographer profile is not available' });
    }

    res.json({ photographer });
  } catch (error) {
    console.error('Get photographer error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Photographer not found' });
    }
    res.status(500).json({ message: 'Server error getting photographer' });
  }
});

module.exports = router;
