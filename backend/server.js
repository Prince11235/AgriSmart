import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { logger } from './utils/logger.js';
import { setupSwagger } from './config/swagger.js';
import { setupSocketIO } from './services/socketService.js';
import { apiLimiter } from './middlewares/rateLimiter.js';
import { errorHandler } from './middlewares/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import cropRoutes from './routes/cropRoutes.js';
import diseaseRoutes from './routes/diseaseRoutes.js';
import soilRoutes from './routes/soilRoutes.js';
import expertRoutes from './routes/expertRoutes.js';
import marketplaceRoutes from './routes/marketplaceRoutes.js';
import schemeRoutes from './routes/schemeRoutes.js';
import diaryRoutes from './routes/diaryRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import farmerRoutes from './routes/farmerRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Middleware setup
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(cors({ origin: process.env.CLIENT_URL || true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/', apiLimiter);

// DB connection
connectDB();

// Swagger Documentation setup
setupSwagger(app);

// Socket.IO setup
setupSocketIO(io);

// API v1 Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/crop', cropRoutes);
app.use('/api/v1/disease', diseaseRoutes);
app.use('/api/v1/soil', soilRoutes);
app.use('/api/v1/expert', expertRoutes);
app.use('/api/v1/marketplace', marketplaceRoutes);
app.use('/api/v1/scheme', schemeRoutes);
app.use('/api/v1/diary', diaryRoutes);
app.use('/api/v1/weather', weatherRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/farmer', farmerRoutes);
app.use('/api/v1/notifications', notificationRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    system: '🌱 AgriSmart Production Backend API',
    version: '1.0.0',
    timestamp: new Date()
  });
});

// Global Error Handler
app.use(errorHandler);

let PORT = process.env.PORT || 5000;

const startServer = (portToUse) => {
  server.listen(portToUse, () => {
    logger.info(`[AgriSmart Server] Running on port ${portToUse}`);
    logger.info(`[Swagger API Docs] Available at http://localhost:${portToUse}/api-docs`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      logger.warn(`[Port Warning] Port ${portToUse} is occupied. Retrying on port ${portToUse + 1}...`);
      startServer(portToUse + 1);
    } else {
      logger.error(`[Server Error] ${err.message}`);
    }
  });
};

startServer(Number(PORT));
