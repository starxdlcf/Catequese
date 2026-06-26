import authController from './auth.controller.js';

async function authRoutes(fastify, options) {
  fastify.post('/signup', authController.signup);
  fastify.post('/login', authController.login);
  fastify.get('/me', { preHandler: [fastify.authenticate] }, authController.me);
}

export default authRoutes;
