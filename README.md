# ConBuilder - Full Stack Web Application

A modern, professional full-stack web application for portfolio management, client testimonials, contact forms, and newsletter subscriptions.

## 🎨 Features

### Landing Page
- ✨ Hero section with modern gradient design
- 📁 Projects showcase with image, name, description
- 👥 Happy clients section with testimonials and ratings
- 📧 Contact form (Full Name, Email, Mobile, City)
- 📰 Newsletter subscription
- 🌙 Dark/Light mode toggle
- 📱 Fully responsive design

### Admin Panel
- 🔐 Secure authentication (Sign up & Login)
- 📊 Dashboard with statistics
- 🛠️ Project Management (Add, Edit, Delete)
- 👥 Client Management (Add, Edit, Delete)
- 📧 Contact Form Submissions (View, Delete)
- 📰 Newsletter Subscribers (View, Delete)
- 🎨 Modern UI with sidebar navigation
- 🌙 Theme toggle support

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **TailwindCSS v4** - Modern utility-first CSS
- **Vite** - Fast build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## 📋 Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Git

## 🏗️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/VIRAT178/conBuilder.git
cd conBuilder
```

### 2. Setup Backend

```bash
cd Backend
npm install
```

Create `.env` file:
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/conbuilder
PORT=5000
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-secret-key
NODE_ENV=development
```

Start backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Create `.env.local` file:
```
VITE_API_URL=http://localhost:5000/api
```

Start frontend development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

#### Sign Up
```
POST /api/auth/signup
Body: { name, email, password }
Response: { token, admin: {...} }
```

#### Login
```
POST /api/auth/login
Body: { email, password }
Response: { token, admin: {...} }
```

#### Verify Token
```
GET /api/auth/verify
Headers: { Authorization: Bearer <token> }
```

### Projects Endpoints

#### Get All Projects
```
GET /api/projects
```

#### Create Project
```
POST /api/projects
Headers: { Authorization: Bearer <token> }
Body: { name, description, image }
```

#### Update Project
```
PUT /api/projects/:id
Headers: { Authorization: Bearer <token> }
Body: { name, description, image }
```

#### Delete Project
```
DELETE /api/projects/:id
Headers: { Authorization: Bearer <token> }
```

### Clients Endpoints

#### Get All Clients
```
GET /api/clients
```

#### Create Client
```
POST /api/clients
Headers: { Authorization: Bearer <token> }
Body: { name, designation, description, image }
```

#### Update Client
```
PUT /api/clients/:id
Headers: { Authorization: Bearer <token> }
Body: { name, designation, description, image }
```

#### Delete Client
```
DELETE /api/clients/:id
Headers: { Authorization: Bearer <token> }
```

### Contact Endpoints

#### Submit Contact Form
```
POST /api/contact/submit
Body: { fullName, email, mobile, city, message }
```

#### Get Contact Submissions
```
GET /api/contact/submissions
Headers: { Authorization: Bearer <token> }
```

#### Delete Submission
```
DELETE /api/contact/submissions/:id
Headers: { Authorization: Bearer <token> }
```

### Newsletter Endpoints

#### Subscribe
```
POST /api/newsletter/subscribe
Body: { email }
```

#### Get Subscribers
```
GET /api/newsletter/subscribers
Headers: { Authorization: Bearer <token> }
```

#### Delete Subscriber
```
DELETE /api/newsletter/subscribers/:id
Headers: { Authorization: Bearer <token> }
```

## 📁 Project Structure

```
conBuilder/
├── Backend/
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Project.js
│   │   ├── Client.js
│   │   ├── Contact.js
│   │   └── Newsletter.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   ├── clients.js
│   │   ├── contact.js
│   │   └── newsletter.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── ClientCard.jsx
│   │   │   ├── ContactForm.jsx
│   │   │   └── NewsletterSubscription.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   └── AdminSignup.jsx
│   │   ├── api/
│   │   │   └── axiosInstance.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env.local
└── README.md
```

## 🎨 Design System

### Color Palette
- **Primary**: #9238ff (Purple)
- **Accent**: #ff2d92 (Pink)
- **Dark**: #111827 (Background)
- **Light**: #f8f9fa (Text)

### Typography
- Clean, modern fonts
- Proper hierarchy
- Accessibility first

### Components
- Reusable, modular React components
- Consistent styling with TailwindCSS
- Responsive breakpoints
- Smooth animations and transitions

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Input validation with express-validator
- CORS protection
- Protected routes for admin operations
- Secure environment variables

## 📱 Responsive Design

- Mobile-first approach
- Tablet optimization
- Desktop enhancements
- Touch-friendly interactions
- Accessible UI elements

## 🚀 Deployment

### Frontend (Vercel)

1. Connect GitHub repository to Vercel
2. Set environment variables:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```
3. Deploy automatically on push

### Backend (Render/Heroku)

1. Create account on Render or Heroku
2. Set environment variables:
   ```
   MONGODB_URI=your-atlas-connection-string
   FRONTEND_URL=https://your-frontend-url.com
   JWT_SECRET=your-secret-key
   NODE_ENV=production
   ```
3. Deploy from GitHub

### Database (MongoDB Atlas)

1. Sign up for free MongoDB Atlas tier
2. Create cluster and database
3. Create admin user for database
4. Get connection string
5. Use in .env MONGODB_URI

## 💻 Development

### Running Locally

Terminal 1 - Backend:
```bash
cd Backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Building for Production

Backend:
```bash
npm start
```

Frontend:
```bash
npm run build
npm run preview
```

## 📝 Demo Credentials

For testing the admin panel:
- Email: `admin@demo.com`
- Password: `demo123`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For support, email support@conbuilder.com or create an issue on GitHub.

## 🎯 Future Enhancements

- [ ] Image upload with cropping
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] SEO optimization
- [ ] Blog/News section
- [ ] Social media integration
- [ ] Multi-language support
- [ ] API documentation with Swagger
- [ ] Rate limiting
- [ ] Advanced caching

---

**Made with ❤️ by ConBuilder**
