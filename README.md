# Sai Ram Diagnostic Center

### Full-Stack Diagnostic Booking Platform

Sai Ram Diagnostic Center is a full-stack diagnostic booking platform built for managing diagnostic tests, patient registrations, online bookings, and administrative operations.

The platform provides patients with a simple way to explore available diagnostic tests, view prices, register/login, and book tests online. Administrators can manage diagnostic tests and bookings through a protected admin dashboard.

## 🚀 Live Demo

https://sai-ram-diagnostic.vercel.app

## 💻 GitHub Repository

https://github.com/shiva-kudumula/sai-ram-diagnostic

## ✨ Features

- 🔐 Patient registration and JWT authentication
- 🛡️ Protected patient and admin routes
- 🧪 Diagnostic test listing with prices
- 📋 Detailed diagnostic test information
- 📅 Online diagnostic test booking
- 👤 Patient dashboard
- 🗂️ Patient booking history
- 🔎 View individual booking details
- 👨‍💼 Protected admin dashboard
- ➕ Admin can add diagnostic tests
- ✏️ Admin can update diagnostic tests
- 🗑️ Admin can delete diagnostic tests
- 📊 Admin can view and manage patient bookings
- 🔄 Booking status management
- 💾 Persistent data using MongoDB
- 🔑 Password hashing using bcrypt
- 🌐 Production deployment with Vercel, Render, and MongoDB Atlas
- 📱 Responsive user interface

## 🧠 How It Works

The core booking pipeline is:

```text
Patient
   │
   ▼
Browse Diagnostic Tests
   │
   ▼
Select Test
   │
   ▼
Login / Register
   │
   ▼
Book Test
   │
   ▼
Express API
   │
   ▼
MongoDB Atlas
   │
   ▼
Booking Confirmation
   │
   ▼
Patient Dashboard
```

The frontend communicates with the Express backend through REST APIs. The backend handles authentication, diagnostic test management, booking operations, and database communication.

Administrators use protected APIs to manage tests and patient bookings.

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │     React + Vite    │
                    │      Frontend       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       Express       │
                    │       Backend       │
                    └──────────┬──────────┘
                               │
                  ┌────────────┼────────────┐
                  │            │            │
                  ▼            ▼            ▼
             ┌─────────┐  ┌─────────┐  ┌────────────┐
             │   JWT   │  │ bcrypt  │  │  MongoDB   │
             │  Auth   │  │ Password│  │   Atlas    │
             └─────────┘  │ Hashing │  └────────────┘
                          └─────────┘
```

The application follows a frontend → API → database architecture:

```text
React
  ↓
Axios
  ↓
Express Routes
  ↓
JWT Authentication / Authorization
  ↓
Controllers
  ↓
Mongoose Models
  ↓
MongoDB Atlas
  ↓
Response
  ↓
React
```

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express.js
- JWT
- bcrypt
- Mongoose
- CORS

### Database

- MongoDB
- MongoDB Atlas

### Deployment

- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

### Version Control

- Git
- GitHub

## 🔐 Authentication

The application uses JWT-based authentication for protected resources.

```text
Register
   ↓
Login
   ↓
JWT Generated
   ↓
JWT Stored
   ↓
Protected API Request
   ↓
JWT Verification
   ↓
Authorized User
```

Passwords are hashed using bcrypt before being stored.

Protected resources include patient-specific booking data and administrative operations.

## 🧪 Diagnostic Tests

The platform contains a catalog of diagnostic tests with their respective prices and availability information.

Patients can:

- Browse diagnostic tests
- View test details
- Check pricing
- Select a test
- Book the test after authentication
- View their bookings from the dashboard

The backend also supports administrative test management.

## 📅 Booking Flow

### 1. Browse Tests

Patients can explore the available diagnostic tests and their prices.

### 2. Select a Test

The patient selects the diagnostic test they want to book.

### 3. Authentication

The patient registers or logs in before creating a booking.

### 4. Create Booking

The frontend sends the booking request to the protected Express API.

### 5. Store Booking

The backend validates the request and stores the booking in MongoDB.

### 6. Track Booking

The patient can view their booking history and booking details from the dashboard.

## 👨‍💼 Admin Flow

Administrators have access to a protected admin console.

```text
Admin Login
    ↓
JWT Authentication
    ↓
Admin Authorization
    ↓
Admin Console
    ↓
┌─────────────────────────────┐
│ Manage Diagnostic Tests     │
│ Manage Patient Bookings     │
│ Update Booking Status       │
└─────────────────────────────┘
```

### Diagnostic Test Management

Administrators can:

- Add new tests
- Update existing tests
- Delete tests
- Manage test information and prices

### Booking Management

Administrators can:

- View patient bookings
- View booking details
- Update booking status

## 📡 API Structure

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Diagnostic Tests

```text
GET    /api/tests
GET    /api/tests/:id
POST   /api/admin/tests
PUT    /api/admin/tests/:id
DELETE /api/admin/tests/:id
```

### Patient Bookings

```text
POST /api/bookings
GET  /api/bookings/my-bookings
GET  /api/bookings/:id
```

### Admin Bookings

```text
GET /api/admin/bookings
PUT /api/admin/bookings/:id
```

## 📁 Project Structure

```text
sai-ram-diagnostic/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── .gitignore
```

## ⚙️ Local Setup

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB or a MongoDB Atlas database
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/shiva-kudumula/sai-ram-diagnostic.git

cd sai-ram-diagnostic
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure Backend Environment Variables

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
ADMIN_NAME=your_admin_name
ADMIN_EMAIL=your_admin_email
ADMIN_PHONE=your_admin_phone
ADMIN_PASSWORD=your_admin_password
```

Never commit `.env` or secret credentials to GitHub.

### 4. Start the Backend

```bash
npm start
```

The backend runs locally on:

```text
http://localhost:5000
```

### 5. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 6. Configure Frontend Environment Variables

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

For production, the frontend API URL points to the deployed Render backend.

### 7. Start the Frontend

```bash
npm run dev
```

The frontend will then be available through the local Vite development server.

## 🌐 Production Deployment

The application uses a three-part production architecture:

```text
Frontend → Vercel
Backend  → Render
Database → MongoDB Atlas
```

### Frontend

The React/Vite frontend is deployed on Vercel.

Production API environment variable:

```env
VITE_API_URL=https://sai-ram-diagnostic.onrender.com/api
```

### Backend

The Node.js/Express backend is deployed on Render.

The backend uses environment variables for:

- MongoDB connection
- JWT secret
- Frontend CORS origin
- Admin configuration

### Database

MongoDB Atlas is used as the production database.

The application stores:

- User accounts
- Diagnostic tests
- Patient bookings
- Booking status and related booking information

## 🔄 Git Workflow

The project uses Git and GitHub for version control.

Typical workflow:

```text
Modify Code
    ↓
git status
    ↓
git add .
    ↓
git commit -m "Meaningful message"
    ↓
git push
```

Changes pushed to the repository can trigger the production deployment workflow.

Environment files, dependencies, build files, and other local-only files are excluded through `.gitignore`.

## 🧩 Key Engineering Challenges

### Authentication and Authorization

JWT authentication was implemented to protect patient-specific and administrative resources.

The backend verifies authenticated users before allowing access to protected APIs.

### Role-Based Access

The application separates normal patient operations from administrative operations.

Admin-only APIs are protected so that test management and booking management are not available to regular patients.

### Frontend ↔ Backend Communication

The React frontend communicates with the Express backend using Axios and REST APIs.

The API URL is configured through environment variables so that local and production environments can use different backend endpoints.

### Database Integration

MongoDB and Mongoose are used to persist application data.

The backend uses Mongoose models to work with users, diagnostic tests, and bookings.

### Production Deployment

The application was deployed using:

```text
Frontend → Vercel
Backend  → Render
Database → MongoDB Atlas
```

Production testing includes:

- Patient registration
- Patient login
- JWT authentication
- Diagnostic test retrieval
- Test booking
- Booking history
- Admin authentication
- Diagnostic test management
- Booking management
- Database persistence

## 📚 What I Learned

Building Sai Ram Diagnostic Center helped me understand how different parts of a real full-stack application work together.

Some of the key areas I worked with:

- React application architecture
- React Router
- REST APIs
- Express.js
- JWT authentication
- Password hashing with bcrypt
- MongoDB data modeling
- Mongoose
- Frontend ↔ backend communication
- Protected routes
- Role-based authorization
- CRUD operations
- Booking workflows
- Environment variables
- CORS configuration
- Git and GitHub
- Vercel deployment
- Render deployment
- MongoDB Atlas
- Debugging production deployment issues

The biggest lesson was that building a real application is not only about writing individual features. It is about making the frontend, backend, database, authentication, deployment, and user workflows work together reliably.

## 🚀 Future Improvements

Possible future improvements include:

- Online payment integration
- Appointment time-slot selection
- Email/SMS booking notifications
- Patient profile management
- More detailed admin analytics
- Improved booking search and filtering
- Automated booking reminders
- PDF booking reports
- Better test availability management
- Enhanced mobile UI
- Improved error handling and validation

## 👨‍💻 Author

**Shiva Kumar Kudumula**

GitHub: https://github.com/shiva-kudumula

## 📄 License

This project is currently intended primarily as a learning and portfolio project.
