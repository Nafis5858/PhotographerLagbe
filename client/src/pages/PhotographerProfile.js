import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCamera, FaMapMarkerAlt, FaStar, FaEdit, FaPlus, FaTrash, FaUpload } from 'react-icons/fa';
import './PhotographerProfile.css';

const PhotographerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPortfolioForm, setShowPortfolioForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      businessName: '',
      bio: '',
      experience: '',
      hourlyRate: '',
      city: '',
      state: '',
      phone: '',
      address: '',
      specializations: []
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Here you would make an API call to create/update photographer profile
      console.log('Profile data:', data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const specializations = [
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
  ];

  return (
    <div className="photographer-profile">
      <div className="container">
        <div className="profile-header">
          <h1>Photographer Profile</h1>
          <p>Create and manage your professional photography profile</p>
        </div>

        <div className="profile-content">
          <div className="profile-form-section">
            <div className="section-header">
              <h2>Basic Information</h2>
              <button
                className="btn btn-outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                <FaEdit />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Business Name</label>
                  <input
                    type="text"
                    className={`form-input ${errors.businessName ? 'error' : ''}`}
                    placeholder="Your photography business name"
                    {...register('businessName', {
                      required: 'Business name is required',
                      minLength: { value: 2, message: 'Business name must be at least 2 characters' }
                    })}
                    disabled={!isEditing}
                  />
                  {errors.businessName && <span className="form-error">{errors.businessName.message}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Years of Experience</label>
                  <input
                    type="number"
                    className={`form-input ${errors.experience ? 'error' : ''}`}
                    placeholder="e.g., 5"
                    {...register('experience', {
                      required: 'Experience is required',
                      min: { value: 0, message: 'Experience cannot be negative' },
                      max: { value: 50, message: 'Experience cannot exceed 50 years' }
                    })}
                    disabled={!isEditing}
                  />
                  {errors.experience && <span className="form-error">{errors.experience.message}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Hourly Rate (BDT)</label>
                  <input
                    type="number"
                    className={`form-input ${errors.hourlyRate ? 'error' : ''}`}
                    placeholder="e.g., 2000"
                    {...register('hourlyRate', {
                      required: 'Hourly rate is required',
                      min: { value: 0, message: 'Hourly rate cannot be negative' }
                    })}
                    disabled={!isEditing}
                  />
                  {errors.hourlyRate && <span className="form-error">{errors.hourlyRate.message}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FaMapMarkerAlt />
                    City
                  </label>
                  <input
                    type="text"
                    className={`form-input ${errors.city ? 'error' : ''}`}
                    placeholder="e.g., Dhaka"
                    {...register('city', {
                      required: 'City is required'
                    })}
                    disabled={!isEditing}
                  />
                  {errors.city && <span className="form-error">{errors.city.message}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    className={`form-input ${errors.state ? 'error' : ''}`}
                    placeholder="e.g., Dhaka Division"
                    {...register('state', {
                      required: 'State is required'
                    })}
                    disabled={!isEditing}
                  />
                  {errors.state && <span className="form-error">{errors.state.message}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                    placeholder="+880 1303634392"
                    {...register('phone', {
                      required: 'Phone number is required'
                    })}
                    disabled={!isEditing}
                  />
                  {errors.phone && <span className="form-error">{errors.phone.message}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className={`form-input ${errors.address ? 'error' : ''}`}
                    placeholder="DIT Project, Road#11, House#32, Badda, Dhaka, Bangladesh"
                    {...register('address', {
                      required: 'Address is required'
                    })}
                    disabled={!isEditing}
                  />
                  {errors.address && <span className="form-error">{errors.address.message}</span>}
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Bio</label>
                  <textarea
                    className={`form-input form-textarea ${errors.bio ? 'error' : ''}`}
                    placeholder="Tell clients about your photography style, experience, and what makes you unique..."
                    {...register('bio', {
                      required: 'Bio is required',
                      minLength: { value: 10, message: 'Bio must be at least 10 characters' },
                      maxLength: { value: 1000, message: 'Bio cannot exceed 1000 characters' }
                    })}
                    disabled={!isEditing}
                  />
                  {errors.bio && <span className="form-error">{errors.bio.message}</span>}
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Specializations</label>
                  <div className="specializations-grid">
                    {specializations.map((spec) => (
                      <label key={spec} className="checkbox-label">
                        <input
                          type="checkbox"
                          value={spec}
                          {...register('specializations')}
                          disabled={!isEditing}
                        />
                        <span className="checkmark"></span>
                        {spec}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="form-actions">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Profile'}
                  </button>
                </div>
              )}
            </form>
          </div>

          <div className="portfolio-section">
            <div className="section-header">
              <h2>Manage Portfolio</h2>
              <button
                className="btn btn-primary"
                onClick={() => setShowPortfolioForm(!showPortfolioForm)}
              >
                <FaPlus />
                {showPortfolioForm ? 'Cancel' : 'Add Portfolio Item'}
              </button>
            </div>

            {showPortfolioForm && (
              <div className="upload-work">
                <h2>Upload Your Work</h2>
                <div className="upload-form">
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select id="category">
                      <option value="Event">Event</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Birthday">Birthday</option>
                      <option value="Portrait">Portrait</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="image-upload" className="upload-label">
                      <FaUpload /> Choose Image
                    </label>
                    <input id="image-upload" type="file" />
                  </div>
                  <button className="upload-btn">Upload</button>
                </div>
              </div>
            )}

            <div className="portfolio-grid">
              {/* Portfolio items will be displayed here */}
              <div className="portfolio-placeholder">
                <FaCamera className="portfolio-icon" />
                <p>No portfolio items yet</p>
                <p>Add your best work to showcase your photography skills</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotographerProfile;
