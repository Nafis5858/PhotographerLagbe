# PhotographerLagbe - MERN Stack Photography Platform

A modern web platform connecting clients with talented photographers across Bangladesh. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring a beautiful, responsive design.

##  Features

### Currently Implemented (Phase 1)
- **User Registration & Login**: Secure authentication system with role-based access
- **Photographer Profile & Portfolio**: Complete profile management for photographers
- **Beautiful Modern UI**: Responsive design with smooth animations
- **Role-based Access Control**: Separate interfaces for clients and photographers

### Planned Features (Future Phases)
- Search & Filter Photographers
- Booking System
- Booking Management
- Photographer Dashboard
- Rating & Review System
- Admin Panel
- Chat/Messaging System
- Photographer List Page

##  Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd photographerlagbe
   ```

2. **Install server dependencies**
   ```bash
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Environment Setup**
   - Copy `env.example` to `.env`
   - Update the following variables:
     ```env
     MONGODB_URI=your_mongodb_atlas_connection_string
     JWT_SECRET=your_jwt_secret_key
     PORT=5000
     NODE_ENV=development
     ```

5. **Start the development servers**
   ```bash
   # Start both server and client (recommended)
   npm run dev
   
   # Or start them separately:
   npm run server    # Backend only
   npm run client    # Frontend only
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000


### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Photographers
- `GET /api/photographers` - Get all photographers (public)
- `GET /api/photographers/:id` - Get photographer by ID (public)
- `POST /api/photographers/profile` - Create photographer profile (private)
- `GET /api/photographers/profile` - Get current photographer profile (private)
- `PUT /api/photographers/profile` - Update photographer profile (private)
- `POST /api/photographers/portfolio` - Add portfolio item (private)
- `DELETE /api/photographers/portfolio/:itemId` - Remove portfolio item (private)

### Users
- `GET /api/users/profile` - Get current user profile (private)
- `PUT /api/users/profile` - Update user profile (private)
- `PUT /api/users/profile-picture` - Update profile picture (private)
- `PUT /api/users/change-password` - Change password (private)
- `DELETE /api/users/profile` - Delete account (private)


## Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **cors** - Cross-origin resource sharing
- **helmet** - Security headers

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **React Hook Form** - Form management
- **Axios** - HTTP client
- **React Query** - Data fetching
- **React Toastify** - Notifications
- **React Icons** - Icon library
- **Framer Motion** - Animations


##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👥 Team

- **Developer**: Nafis Kamal Zisan
- **Design**: Modern UI/UX with focus on user experience
- **Backend**: Robust API with security best practices

## 📞 Support

For support and questions:
- Email: nafis.kamal.zisan@g.bracu.ac.bd
- Phone: +880 1303634392

---

**PhotographerLagbe** - Connecting talent with opportunity across Bangladesh! 📸 
