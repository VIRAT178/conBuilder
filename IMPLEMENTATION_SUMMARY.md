# ConBuilder - Implementation Summary

## Project Overview
ConBuilder is a full-stack web application for managing digital projects, clients, and business relationships. Built with React (Vite) frontend and Node.js Express backend with MongoDB.

**Live Frontend:** https://con-builder.vercel.app  
**Repository:** https://github.com/VIRAT178/conBuilder

---

## Features Implemented

### 1. **Core Application Features**
- ✅ Landing page with hero section, features showcase, projects gallery, clients testimonials
- ✅ Admin authentication (Login/Signup with JWT tokens)
- ✅ Admin Dashboard for managing projects and clients
- ✅ Projects CRUD operations (Create, Read, Update, Delete)
- ✅ Clients CRUD operations with testimonials
- ✅ Contact form submissions management
- ✅ Newsletter subscription management
- ✅ Dark theme with light/dark mode toggle

### 2. **Image Cropping Feature** ⭐ (Bonus Feature)
**Objective:** Automatically crop images to a specific ratio (450x350) when uploaded from the admin panel.

#### Backend Implementation (`Backend/routes/upload.js`)
- **Technology:** Multer + Sharp
- **Functionality:**
  - Accepts multipart form-data file uploads
  - Processes images in memory using Sharp
  - Automatically crops to 450x350px with "cover" fit strategy (center position)
  - Compresses as JPEG with 85% quality
  - Saves cropped image to `Backend/uploads/` directory
  - Returns absolute URL for frontend consumption
  - Protected route (requires JWT authentication)

```javascript
// Example endpoint
POST /api/upload
Headers: Authorization: Bearer <token>
Body: FormData { image: <File> }
Response: {
  success: true,
  url: "http://localhost:5000/uploads/img-1765295062088-123456.jpg",
  width: 450,
  height: 350
}
```

#### Frontend Implementation (`frontend/src/pages/AdminPanel.jsx`)
- **Upload UI Components:**
  - File input with image type restriction
  - Real-time image preview (project: 176px height, client: 144px height)
  - Loading state indicator during upload
  - Helper text explaining crop behavior
  - Optional URL input as fallback

- **State Management:**
  - `projectImageUploading` - tracks project image upload status
  - `clientImageUploading` - tracks client image upload status
  - Reusable `uploadImageAndSet()` helper function
  - Dedicated handlers: `handleProjectImageUpload()` and `handleClientImageUpload()`

- **API Integration:**
  - New `uploadAPI.uploadImage(file)` method in `axiosInstance.js`
  - Sends FormData to backend with multipart headers
  - Error handling with user-friendly messages

#### Modal UI Fixes
- Both project and client modals now have:
  - `max-h-[85vh] overflow-y-auto` for scrollability on small screens
  - Bottom padding (`pb-2`) to prevent content overlap with scrollbar

---

## Technical Stack

### Frontend
- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS + custom dark theme
- **Icons:** Lucide React
- **HTTP Client:** Axios with interceptors for JWT auth
- **Routing:** React Router v6
- **State Management:** React Hooks (useState, useEffect)
- **Deployment:** Vercel

### Backend
- **Runtime:** Node.js (v22.14.0)
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **File Upload:** Multer
- **Image Processing:** Sharp
- **CORS:** Enabled for cross-origin requests
- **Input Validation:** express-validator

### Dependencies Added for Image Cropping
```json
{
  "multer": "^1.4.5-lts.2",
  "sharp": "^0.33.4"
}
```

---

## File Structure

```
Backend/
├── routes/
│   ├── auth.js
│   ├── projects.js
│   ├── clients.js
│   ├── contact.js
│   ├── newsletter.js
│   └── upload.js (NEW)
├── models/
│   ├── Admin.js
│   ├── Project.js
│   ├── Client.js
│   ├── Contact.js
│   └── Newsletter.js
├── middleware/
│   └── auth.js
├── uploads/ (created at runtime)
├── server.js
├── .env.example (NEW)
└── package.json

frontend/
├── src/
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── AdminSignup.jsx
│   │   └── AdminPanel.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── ClientCard.jsx
│   │   ├── ContactForm.jsx
│   │   └── NewsletterSubscription.jsx
│   ├── api/
│   │   └── axiosInstance.js
│   ├── App.jsx
│   └── main.jsx
├── vercel.json
├── vite.config.js
└── package.json
```

---

## Recent Changes & Fixes

### 1. Image Upload & Cropping Implementation
- Created `Backend/routes/upload.js` with multer + sharp integration
- Updated `Backend/server.js` to:
  - Import upload routes
  - Serve `/uploads` directory statically
  - Resolve `__dirname` in ESM context
- Updated `frontend/src/api/axiosInstance.js` to add `uploadAPI` helper
- Enhanced `AdminPanel.jsx` modals with file upload UI and preview

### 2. Modal Overflow Fix
- Made project and client modals scrollable (`max-h-[85vh] overflow-y-auto`)
- Added bottom padding to prevent content overlap

### 3. Security Fixes
- Removed committed `.env` containing sensitive credentials (MongoDB URI, JWT secret)
- Created `.env.example` template with placeholder values
- Users must create local `.env` for development

### 4. Build Fix - Case Sensitivity
- Fixed file case mismatch: renamed `AdminSignUp.jsx` → `AdminSignup.jsx`
- Resolved Vercel build failure due to import resolution

---

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/conbuilder
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
JWT_SECRET=<your-secret-key>
```

### Frontend (Vercel Environment Variables)
```env
VITE_API_URL=https://<your-backend-url>/api
```

---

## Installation & Setup

### Local Development

**Backend:**
```bash
cd Backend
npm install
npm run dev  # Start with nodemon
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev  # Vite dev server (http://localhost:3000)
```

### Production Deployment

**Frontend (Vercel):**
- Connected to GitHub repository
- Automatic deployments on push to main
- Build command: `npm install && npm run build`

**Backend:**
- Needs deployment to a public server (Railway, Render, Heroku, etc.)
- Set `VITE_API_URL` in Vercel after backend deployment

---

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new admin account
- `POST /api/auth/login` - Login admin
- `GET /api/auth/verify` - Verify JWT token

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

### Clients
- `GET /api/clients` - Get all clients
- `GET /api/clients/:id` - Get single client
- `POST /api/clients` - Create client (protected)
- `PUT /api/clients/:id` - Update client (protected)
- `DELETE /api/clients/:id` - Delete client (protected)

### Image Upload (NEW)
- `POST /api/upload` - Upload and crop image to 450x350 (protected)

### Contact & Newsletter
- `POST /api/contact/submit` - Submit contact form
- `GET /api/contact/submissions` - Get contact submissions (protected)
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `GET /api/newsletter/subscribers` - Get subscribers (protected)

---

## Known Issues & Next Steps

### Current Blockers
1. **Backend Deployment:** Backend is running locally; needs deployment to public server
   - **Solution:** Deploy to Railway, Render, or Heroku
   - Once deployed, update `VITE_API_URL` in Vercel

2. **CORS Configuration:** Currently allows `http://localhost:3000`
   - **Solution:** Update `FRONTEND_URL` in backend `.env` to Vercel URL after deployment

### Future Enhancements
- Image optimization: WebP format support
- Batch image uploads
- Image gallery with pagination
- Advanced search/filter on admin dashboard
- Email notifications on new contacts
- Analytics dashboard

---

## Testing

### Manual Testing Checklist
- ✅ Landing page loads and displays projects/clients from API
- ✅ Admin login/signup with JWT token persistence
- ✅ Create/Edit/Delete projects with image uploads
- ✅ Create/Edit/Delete clients with image uploads
- ✅ Image cropping to 450x350 on upload
- ✅ Modal UI responsive and scrollable
- ✅ Dark/light theme toggle
- ✅ Contact form submission
- ✅ Newsletter subscription

---

## Security Considerations

### Implemented
- ✅ JWT authentication for admin routes
- ✅ Password hashing with bcryptjs
- ✅ Protected API routes with `protect` middleware
- ✅ CORS headers for cross-origin requests
- ✅ Environment variables for sensitive data

### Recommendations
- 🔒 Rotate MongoDB and JWT secrets immediately (current values exposed in git history)
- 🔒 Use strong, unique JWT_SECRET in production
- 🔒 Implement rate limiting on auth endpoints
- 🔒 Add input sanitization for contact forms
- 🔒 Enable HTTPS in production

---

## Contact & Support

**Project Owner:** Virat178  
**GitHub:** https://github.com/VIRAT178/conBuilder  
**Deployed:** https://con-builder.vercel.app

---

**Last Updated:** December 9, 2025  
**Status:** In Active Development
