import React, { useState, useEffect } from 'react';
import { FaUser, FaBook, FaImages, FaMoneyBillWave, FaEnvelope, FaStar, FaCalendarAlt, FaBell, FaCog } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import './PhotographerDashboard.css';

const PhotographerDashboard = () => {
  const { user } = useAuth();
  const [photographer, setPhotographer] = useState(null);
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState('Event');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchPhotographerData = async () => {
      try {
        const res = await api.get('/photographers/profile');
        setPhotographer(res.data.photographer);
        setPortfolio(res.data.photographer.portfolio || []);
      } catch (err) {
        setError('Failed to fetch photographer data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPhotographerData();
    }
  }, [user]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('category', category);

    try {
      const res = await api.post('/photographers/upload-work', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPortfolio(res.data.portfolio);
      setMessage('Upload successful!');
      setError('');
      setSelectedFile(null);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during upload.');
      setMessage('');
    }
  };

  const handleProfilePictureUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const res = await api.post('/photographers/upload-profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPhotographer(res.data.photographer);
      setMessage('Profile picture updated successfully!');
      setError('');
      setSelectedFile(null);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during upload.');
      setMessage('');
    }
  };

  return (
    <div className="photographer-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>{photographer ? `${photographer.businessName}'s Dashboard` : 'Photographer Dashboard'}</h1>
          <p>Manage your photography business</p>
        </div>

        <div className="dashboard-grid">

          <div className="dashboard-card">
            <h3><FaBook /> Upcoming Bookings</h3>
            <ul>
              <li>Wedding Photoshoot - Aug 10, 2024</li>
              <li>Portrait Session - Aug 15, 2024</li>
            </ul>
          </div>

          <div className="dashboard-card">
            <h3><FaImages /> Portfolio Management</h3>
            <p>Showcase your best work.</p>
            <button>Upload New Photos</button>
            <button>Organize into Albums</button>
          </div>

          <div className="dashboard-card">
            <h3><FaMoneyBillWave /> Earnings & Payments</h3>
            <p>Total Earnings: ৳500,000</p>
            <p>Pending Payments: ৳50,000</p>
            <button>View Payment History</button>
          </div>

          <div className="dashboard-card">
            <h3><FaEnvelope /> Messages / Chat System</h3>
            <p>You have 3 unread messages.</p>
            <button>Go to Inbox</button>
          </div>

          <div className="dashboard-card">
            <h3><FaStar /> Reviews & Ratings</h3>
            <p>Average Rating: 4.8/5</p>
            <button>View All Reviews</button>
          </div>

          <div className="dashboard-card">
            <h3><FaCalendarAlt /> Availability Calendar</h3>
            <div className="calendar">
              <div className="calendar-header">
                <h4>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h4>
              </div>
              <div className="calendar-body">
                <div className="calendar-days">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>
                <div className="calendar-dates">
                  {[...Array(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate())].map((_, i) => (
                    <span key={i} className={i + 1 === 10 || i + 1 === 15 ? 'booked' : ''}>
                      {i + 1}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3><FaBell /> Notifications</h3>
            <p>You have 5 new notifications.</p>
            <button>View Notifications</button>
          </div>

          <div className="dashboard-card">
            <h3><FaUser /> Profile Picture</h3>
            <img
              src={photographer?.profilePicture || '/images/default-profile.png'}
              alt="Profile"
              className="profile-picture"
            />
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleProfilePictureUpload}>Upload Profile Picture</button>
          </div>

          <div className="dashboard-card">
            <h3><FaCog /> Settings</h3>
            <button>Change Password</button>
            <button>Enable/Disable Booking Requests</button>
            <button>Set Preferred Genres</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PhotographerDashboard;
