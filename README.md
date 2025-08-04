# PhotographerLagbe - MERN Stack Photography Platform

A modern web platform connecting clients with talented photographers across Bangladesh. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring a beautiful, responsive design.

## 🌟 Features

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

## 🚀 Quick Start

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

## 📁 Project Structure

```
photographerlagbe/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   └── ...
│   └── package.json
├── models/                 # MongoDB models
│   ├── User.js
│   └── Photographer.js
├── routes/                 # API routes
│   ├── auth.js
│   ├── photographers.js
│   └── users.js
├── middleware/             # Custom middleware
│   └── auth.js
├── server.js              # Main server file
├── package.json
└── README.md
```

## 🔧 API Endpoints

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

## 🎨 Design System

The application uses a modern design system with:
- **Color Palette**: Primary (Indigo), Secondary (Amber), Accent (Emerald)
- **Typography**: Inter font family
- **Components**: Reusable UI components with consistent styling
- **Responsive Design**: Mobile-first approach
- **Animations**: Smooth transitions and hover effects

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting
- CORS protection
- Helmet.js security headers

## 🛠️ Technologies Used

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

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Backend Deployment (Heroku)
1. Create a Heroku app
2. Set environment variables
3. Deploy using Git:
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

### Frontend Deployment (Netlify/Vercel)
1. Build the React app:
   ```bash
   cd client
   npm run build
   ```
2. Deploy the `build` folder to your preferred platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: [Your Name]
- **Design**: Modern UI/UX with focus on user experience
- **Backend**: Robust API with security best practices

## 📞 Support

For support and questions:
- Email: info@photographerlagbe.com
- Phone: +880 1303634392

## 🔮 Roadmap

### Phase 2 (Next)
- [ ] Search and filter functionality
- [ ] Booking system
- [ ] Payment integration
- [ ] Real-time messaging

### Phase 3
- [ ] Admin panel
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Multi-language support

---

**PhotographerLagbe** - Connecting talent with opportunity across Bangladesh! 📸 
