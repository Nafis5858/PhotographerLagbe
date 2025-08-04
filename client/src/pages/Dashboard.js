import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCamera, FaEdit, FaSave } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: {
        street: user?.address?.street || '',
        city: user?.address?.city || '',
        state: user?.address?.state || '',
        zipCode: user?.address?.zipCode || ''
      }
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Here you would typically make an API call to update the user profile
      // For now, we'll just update the local state
      updateUser({ ...user, ...data });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Welcome back, {user?.name}!</p>
        </div>

        <div className="dashboard-content">
          <div className="profile-section">
            <div className="profile-header">
              <div className="profile-avatar">
                {user?.profilePicture ? (
                  <img src={user.profilePicture} alt={user.name} />
                ) : (
                  <FaUser className="avatar-icon" />
                )}
              </div>
              <div className="profile-info">
                <h2>{user?.name}</h2>
                <p className="user-role">{user?.role === 'photographer' ? 'Professional Photographer' : 'Client'}</p>
                <p className="user-email">{user?.email}</p>
              </div>
              <button
                className="btn btn-outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? <FaSave /> : <FaEdit />}
                {isEditing ? 'Save' : 'Edit Profile'}
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    <FaUser />
                    Full Name
                  </label>
                  <input
                    type="text"
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    {...register('name', {
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' }
                    })}
                    disabled={!isEditing}
                  />
                  {errors.name && <span className="form-error">{errors.name.message}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FaEnvelope />
                    Email Address
                  </label>
                  <input
                    type="email"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email'
                      }
                    })}
                    disabled={!isEditing}
                  />
                  {errors.email && <span className="form-error">{errors.email.message}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FaPhone />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^(\+880|880|0)?1[3456789]\d{8}$/,
                        message: 'Please enter a valid Bangladeshi phone number'
                      }
                    })}
                    disabled={!isEditing}
                  />
                  {errors.phone && <span className="form-error">{errors.phone.message}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FaMapMarkerAlt />
                    Street Address
                  </label>
                  <input
                    type="text"
                    className={`form-input ${errors.address?.street ? 'error' : ''}`}
                    {...register('address.street')}
                    disabled={!isEditing}
                  />
                  {errors.address?.street && <span className="form-error">{errors.address.street.message}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className={`form-input ${errors.address?.city ? 'error' : ''}`}
                    {...register('address.city')}
                    disabled={!isEditing}
                  />
                  {errors.address?.city && <span className="form-error">{errors.address.city.message}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    className={`form-input ${errors.address?.state ? 'error' : ''}`}
                    {...register('address.state')}
                    disabled={!isEditing}
                  />
                  {errors.address?.state && <span className="form-error">{errors.address.state.message}</span>}
                </div>
              </div>

              {isEditing && (
                <div className="form-actions">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>

          {user?.role === 'photographer' && (
            <div className="photographer-actions">
              <h3>Photographer Actions</h3>
              <div className="action-buttons">
                <button className="btn btn-primary">
                  <FaCamera />
                  Manage Portfolio
                </button>
                <button className="btn btn-outline">
                  View Bookings
                </button>
                <button className="btn btn-outline">
                  Update Services
                </button>
              </div>
            </div>
          )}

          {user?.role === 'client' && (
            <div className="client-actions">
              <h3>Client Actions</h3>
              <div className="action-buttons">
                <button className="btn btn-primary">
                  Find Photographers
                </button>
                <button className="btn btn-outline">
                  View Bookings
                </button>
                <button className="btn btn-outline">
                  My Favorites
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 