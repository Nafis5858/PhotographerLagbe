import React from 'react';
import { Link } from 'react-router-dom';
import { FaCamera, FaSearch, FaStar, FaUsers, FaShieldAlt } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css';

const Home = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Find the Perfect <span className="highlight">Photographer</span> for Your Special Moments
              </h1>
              <p className="hero-description">
                Connect with talented photographers across Bangladesh. From weddings to portraits, 
                events to commercial shoots - we have the perfect photographer for every occasion.
              </p>
              <div className="hero-actions">
                <Link to="/photographers" className="btn btn-primary btn-lg">
                  <FaSearch />
                  Find Photographers
                </Link>
                <Link to="/register" className="btn btn-primary btn-lg">
                  <FaCamera />
                  Join as Photographer
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <Slider {...sliderSettings}>
                <div>
                  <img src="/images/wedding.jpg" alt="Wedding Photography" />
                </div>
                <div>
                  <img src="/images/Portrait.JPG" alt="Portrait Photography" />
                </div>
                <div>
                  <img src="/images/birthday.png" alt="Birthday Photography" />
                </div>
                <div>
                  <img src="/images/commercial.jpeg" alt="Commercial Photography" />
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose PhotographerLagbe?</h2>
            <p>We make finding the perfect photographer simple and reliable</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaSearch />
              </div>
              <h3>Easy Discovery</h3>
              <p>Browse through verified photographers with detailed profiles, portfolios, and reviews to find your perfect match.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaStar />
              </div>
              <h3>Verified Quality</h3>
              <p>All photographers are verified and rated by previous clients, ensuring you get the best quality service.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaUsers />
              </div>
              <h3>Diverse Talent</h3>
              <p>From wedding specialists to portrait experts, find photographers for every type of photography need.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaShieldAlt />
              </div>
              <h3>Secure Booking</h3>
              <p>Safe and secure booking system with transparent pricing and clear communication channels.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="container">
          <div className="section-header">
            <h2>Photography Services</h2>
            <p>Professional photography for every occasion</p>
          </div>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-image">
                <img src="/images/wedding.jpg" alt="Wedding Photography" />
              </div>
              <div className="service-content">
                <h3>Wedding Photography</h3>
                <p>Capture your special day with professional wedding photographers who specialize in creating timeless memories.</p>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-image">
                <img src="/images/Portrait.JPG" alt="Portrait Photography" />
              </div>
              <div className="service-content">
                <h3>Portrait Photography</h3>
                <p>Professional portraits for individuals, families, and corporate needs with expert lighting and composition.</p>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-image">
                <img src="/images/birthday.png" alt="Event Photography" />
              </div>
              <div className="service-content">
                <h3>Event Photography</h3>
                <p>From corporate events to birthday parties, capture every moment with our experienced event photographers.</p>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-image">
                <img src="/images/commercial.jpeg" alt="Commercial Photography" />
              </div>
              <div className="service-content">
                <h3>Commercial Photography</h3>
                <p>High-quality product and commercial photography for businesses, marketing, and advertising needs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Find Your Perfect Photographer?</h2>
            <p>Join thousands of satisfied clients who found their ideal photographer through PhotographerLagbe</p>
            <div className="cta-actions">
              <Link to="/photographers" className="btn btn-primary btn-lg">
                Browse Photographers
              </Link>
              <Link to="/register" className="btn btn-primary btn-lg">
                Register as Photographer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
