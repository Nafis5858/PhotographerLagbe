const mongoose = require('mongoose');

const photographerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  businessName: {
    type: String,
    required: [true, 'Business name is required'],
    trim: true,
    maxlength: [100, 'Business name cannot exceed 100 characters']
  },
  bio: {
    type: String,
    required: [true, 'Bio is required'],
    maxlength: [1000, 'Bio cannot exceed 1000 characters']
  },
  specializations: [{
    type: String,
    enum: [
      'Wedding Photography',
      'Portrait Photography',
      'Event Photography',
      'Commercial Photography',
      'Fashion Photography',
      'Product Photography',
      'Real Estate Photography',
      'Food Photography',
      'Nature Photography',
      'Street Photography',
      'Sports Photography',
      'Documentary Photography'
    ]
  }],
  experience: {
    type: Number,
    required: [true, 'Experience in years is required'],
    min: [0, 'Experience cannot be negative'],
    max: [50, 'Experience cannot exceed 50 years']
  },
  hourlyRate: {
    type: Number,
    required: [true, 'Hourly rate is required'],
    min: [0, 'Hourly rate cannot be negative']
  },
  portfolio: [{
    title: {
      type: String,
      required: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    imageUrl: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: [
        'Wedding',
        'Portrait',
        'Event',
        'Commercial',
        'Fashion',
        'Product',
        'Real Estate',
        'Food',
        'Nature',
        'Street',
        'Sports',
        'Documentary'
      ]
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  services: [{
    name: {
      type: String,
      required: true,
      maxlength: [100, 'Service name cannot exceed 100 characters']
    },
    description: {
      type: String,
      maxlength: [500, 'Service description cannot exceed 500 characters']
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    },
    duration: {
      type: Number, // in hours
      required: true,
      min: [0.5, 'Duration must be at least 0.5 hours']
    }
  }],
  location: {
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  availability: {
    monday: { start: String, end: String, available: { type: Boolean, default: true } },
    tuesday: { start: String, end: String, available: { type: Boolean, default: true } },
    wednesday: { start: String, end: String, available: { type: Boolean, default: true } },
    thursday: { start: String, end: String, available: { type: Boolean, default: true } },
    friday: { start: String, end: String, available: { type: Boolean, default: true } },
    saturday: { start: String, end: String, available: { type: Boolean, default: true } },
    sunday: { start: String, end: String, available: { type: Boolean, default: true } }
  },
  equipment: [{
    type: String,
    maxlength: [100, 'Equipment name cannot exceed 100 characters']
  }],
  certifications: [{
    name: String,
    issuer: String,
    year: Number,
    certificateUrl: String
  }],
  socialMedia: {
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String,
    website: String
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for search functionality
photographerSchema.index({
  businessName: 'text',
  bio: 'text',
  'location.city': 'text',
  'location.state': 'text',
  specializations: 'text'
});

// Virtual for full address
photographerSchema.virtual('fullAddress').get(function() {
  return `${this.location.city}, ${this.location.state}, Bangladesh`;
});

// Ensure virtual fields are serialized
photographerSchema.set('toJSON', { virtuals: true });
photographerSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Photographer', photographerSchema); 