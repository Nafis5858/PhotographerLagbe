import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaStar, FaMapMarkerAlt, FaCamera } from 'react-icons/fa';
import api from '../utils/api';
import './PhotographerList.css';

const PhotographerList = () => {
  const [photographers, setPhotographers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        const res = await api.get('/api/photographers');
        console.log(res.data);
        setPhotographers(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotographers();
  }, []);

  return (
    <div className="photographer-list">
      <div className="container">
        <div className="list-header">
          <h1>Find Photographers</h1>
          <p>Discover talented photographers in your area</p>
        </div>

        <div className="search-filters">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search photographers, locations, or specializations..."
            />
          </div>
          <button className="btn btn-outline">
            <FaFilter />
            Filters
          </button>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading photographers...</p>
          </div>
        ) : (
          <div className="photographers-grid">
            {photographers.length > 0 ? (
              photographers.map((photographer) => (
                <div key={photographer._id} className="photographer-card">
                  <Link to={`/photographers/${photographer._id}`}>
                    <img
                      src={photographer.profilePicture || '/images/default-profile.png'}
                      alt={photographer.name}
                      className="photographer-image"
                    />
                    <div className="photographer-info">
                      <h3>{photographer.name}</h3>
                      <div className="photographer-rating">
                        <FaStar />
                        <span>{photographer.rating || 'N/A'}</span>
                      </div>
                      <div className="photographer-location">
                        <FaMapMarkerAlt />
                        <span>{photographer.location || 'Not specified'}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <FaCamera className="empty-icon" />
                <h3>No photographers found</h3>
                <p>Try adjusting your search criteria or check back later</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotographerList;
