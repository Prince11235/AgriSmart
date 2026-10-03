import swaggerUi from 'swagger-ui-express';

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: '🌱 AgriSmart REST API Documentation',
    version: '1.0.0',
    description: 'Production OpenAPI specs for AgriSmart AI Crop Advisory, Soil Analysis, Disease Scanner & Marketplace.'
  },
  servers: [{ url: 'http://localhost:5000/api/v1', description: 'Local Development Server' }],
  paths: {
    '/auth/login': {
      post: {
        summary: 'User Login & Role Switch',
        responses: { 200: { description: 'Authenticated with JWT tokens' } }
      }
    },
    '/crop/recommend': {
      post: {
        summary: 'AI Crop Recommendation Engine',
        responses: { 200: { description: 'Top 5 ranked crops with yield & profit projections' } }
      }
    },
    '/disease/scan': {
      post: {
        summary: 'AI Leaf Disease Scanner',
        responses: { 200: { description: 'Disease diagnosis and organic/chemical remedies' } }
      }
    },
    '/soil/analyze': {
      post: {
        summary: 'Soil Health Score & NPK Calculator',
        responses: { 200: { description: 'Nutrient radar chart metrics and advice' } }
      }
    }
  }
};

export const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
