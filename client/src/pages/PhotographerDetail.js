import React from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaCamera, FaPhone, FaEnvelope, FaCalendar } from 'react-icons/fa';
import './PhotographerDetail.css';

const PhotographerDetail = () => {
  const { id } = useParams();

  return (
    <div className="photographer-detail">
      <div className="container">
        <div className="detail-header">
          <h1>Photographer Profile</h1>
          <p>Photographer ID: {id}</p>
        </div>

        <div className="detail-content">
          <div className="empty-state">
            <FaCamera className="empty-icon" />
            <h3>Photographer not found</h3>
            <p>This photographer profile doesn't exist or has been removed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotographerDetail; 