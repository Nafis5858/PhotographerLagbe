import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaPhone, FaCamera, FaUserTie } from 'react-icons/fa';
import './Auth.css';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('client');
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const userData = {
        ...data,
        role: selectedRole
      };
      const result = await registerUser(userData);
      if (result.success) {
        if (selectedRole === 'photographer') {
          navigate('/photographer/profile');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Join PhotographerLagbe and start your journey</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-group">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Enter your full name"
                  {...register('name', {
                    required: 'Full name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    },
                    maxLength: {
                      value: 50,
                      message: 'Name cannot exceed 50 characters'
                    }
                  })}
                />
              </div>
              {errors.name && (
                <span className="form-error">{errors.name.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="Enter your email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Please enter a valid email address'
                    }
                  })}
                />
              </div>
              {errors.email && (
                <span className="form-error">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div className="input-group">
                <FaPhone className="input-icon" />
                <input
                  type="tel"
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="Enter your phone number"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^(\+880|880|0)?1[3456789]\d{8}$/,
                      message: 'Please enter a valid Bangladeshi phone number'
                    }
                  })}
                />
              </div>
              {errors.phone && (
                <span className="form-error">{errors.phone.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Account Type</label>
              <div className="role-selector">
                <label className={`role-option ${selectedRole === 'client' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="role"
                    value="client"
                    checked={selectedRole === 'client'}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  />
                  <div className="role-content">
                    <FaUserTie className="role-icon" />
                    <div className="role-text">
                      <h4>Client</h4>
                      <p>I want to hire photographers</p>
                    </div>
                  </div>
                </label>
                
                <label className={`role-option ${selectedRole === 'photographer' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="role"
                    value="photographer"
                    checked={selectedRole === 'photographer'}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  />
                  <div className="role-content">
                    <FaCamera className="role-icon" />
                    <div className="role-text">
                      <h4>Photographer</h4>
                      <p>I want to offer photography services</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-group">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Create a password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="input-group">
                <FaLock className="input-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Confirm your password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="form-error">{errors.confirmPassword.message}</span>
              )}
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  {...register('agree', {
                    required: 'You must agree to the terms and conditions'
                  })}
                />
                <span className="checkmark"></span>
                I agree to the{' '}
                <Link to="/terms" className="auth-link">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="auth-link">
                  Privacy Policy
                </Link>
              </label>
              {errors.agree && (
                <span className="form-error">{errors.agree.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg auth-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="auth-illustration">
          <div className="illustration-content">
            <h2>Join Our Community</h2>
            <p>
              Whether you're looking for a photographer or want to offer your 
              photography services, PhotographerLagbe is the perfect platform for you.
            </p>
            <div className="illustration-features">
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>Easy registration process</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>Secure and reliable platform</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>24/7 customer support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 