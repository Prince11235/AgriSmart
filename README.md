# 🌱 AgriSmart — AI Powered Smart Crop Advisory System

Production-oriented MERN stack for precision agriculture: crop AI, soil diagnostics, weather intelligence, expert consultations, marketplace, government schemes, real-time notifications, and multi-role RBAC dashboards.

## Architecture

| Layer | Stack |
|--------|--------|
| Frontend | React 19, Vite, Tailwind CSS, Shadcn-style UI, Framer Motion, React Router, TanStack Query, Redux Toolkit, React Hook Form, Zod, Axios, Recharts, Leaflet, Socket.IO Client |
| Backend | Node.js, Express, MongoDB Atlas, Mongoose, JWT + refresh rotation, RBAC, Socket.IO, Multer, Cloudinary, Winston, Helmet, CORS, Compression, Rate limiting |
| Deploy | Frontend → Vercel · Backend → Render/Railway · DB → MongoDB Atlas |

## Quick start

### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run seed    # demo users — password: password123
npm run dev     # http://localhost:5000 · Swagger: /api-docs
```

### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev     # http://localhost:5173 (proxies /api → backend)
```

### Docker
```bash
docker-compose up --build
```

## Demo accounts (after seed)

| Email | Role |
|-------|------|
| farmer@agrismart.demo | Farmer |
| expert@agrismart.demo | Expert |
| officer@agrismart.demo | Agricultural Officer |
| seller@agrismart.demo | Marketplace Seller |
| gov@agrismart.demo | Government Admin |
| admin@agrismart.demo | Super Admin |

Password for all: `password123`

## API

- Base path: `/api/v1`
- Auth: Bearer JWT + `/auth/refresh` rotation
- Swagger: `http://localhost:5000/api-docs`

## Project structure

```
backend/
  controllers/  routes/  models/  middlewares/  services/
  validators/   repositories/  config/  utils/  jobs/
frontend/
  src/components/  pages/  hooks/  redux/  services/
  layouts/  constants/  providers/  utils/
```

## Environment

See `backend/.env.example` and `frontend/.env.example` for MongoDB Atlas, Cloudinary, OpenWeather, SMTP, Twilio, FCM, and Google OAuth keys.

## CI

GitHub Actions workflow: `.github/workflows/ci.yml` (backend syntax check + frontend production build).
