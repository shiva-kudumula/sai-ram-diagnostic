# Sai Ram Diagnostic Center — Full-Stack Booking Platform

A full-stack diagnostic booking application for Sai Ram Diagnostic Center in Kosgi. Patients can browse the centre's existing tests, create an account, book a test, and track bookings. Administrators can manage tests and update booking statuses.

## Features

- Responsive React healthcare website retaining the original branding, images, address, contact details, and all 52 original test names/prices.
- Patient registration/login with bcrypt password hashing and JWT authentication.
- Searchable, filterable diagnostic test catalogue supplied by the API.
- Authenticated booking workflow, booking history, and patient dashboard.
- Role-based admin dashboard for test CRUD and booking status management.
- Express REST API, MongoDB/Mongoose models, input validation, and protected endpoints.

## Tech stack

React, Vite, React Router, Axios, Bootstrap · Node.js, Express, JWT, bcrypt · MongoDB, Mongoose.

## Architecture

`React client → Express REST API → MongoDB`

## Project structure

```text
frontend/                 React + Vite application
  src/components/         Navigation and route protection
  src/context/            Authentication state
  src/pages/              Public, patient, and admin pages
  src/services/api.js     Central Axios client
backend/                  Express API
  models/                 User, Test, Booking schemas
  controllers/            API business logic
  middleware/             JWT and admin checks
  routes/                 REST route definitions
  scripts/seed.js         Preserves and inserts the 52 original tests
```

## Setup

1. Install [Node.js](https://nodejs.org/) and run MongoDB locally, or create a MongoDB Atlas database.
2. Copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI` and a long, unique `JWT_SECRET`.
3. Optional: set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME`, and `ADMIN_PHONE` in `backend/.env` to create an admin account.
4. Copy `frontend/.env.example` to `frontend/.env`. The default API URL works for local development.
5. In two terminals, run:

```powershell
cd backend
npm install
npm run seed
npm run dev
```

```powershell
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the frontend terminal (normally `http://localhost:5173`).

## Important API endpoints

| Method | Endpoint | Use |
| --- | --- | --- |
| POST | `/api/auth/register` | Register a patient |
| POST | `/api/auth/login` | Log in and receive JWT |
| GET | `/api/auth/me` | Current authenticated user |
| GET | `/api/tests` | Available tests |
| POST | `/api/bookings` | Create patient booking |
| GET | `/api/bookings/my-bookings` | Patient bookings |
| GET | `/api/admin/bookings` | Admin booking list |
| POST/PUT/DELETE | `/api/admin/tests` | Admin test management |

## Admin credentials

No insecure default admin was committed. Define `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `backend/.env`, then run `npm run seed`; use those credentials to log in.

## Future improvements

Online payments, appointment slots, email/SMS/WhatsApp notifications, diagnostic-report downloads, and doctor referral management.

## Resume description

Built a full-stack diagnostic booking platform using React, Node.js, Express, and MongoDB. Implemented REST APIs, JWT authentication, bcrypt password hashing, role-based admin authorization, test CRUD operations, and an end-to-end patient booking workflow.
