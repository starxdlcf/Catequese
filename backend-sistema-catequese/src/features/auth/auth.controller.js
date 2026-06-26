import authService from './auth.service.js';

class AuthController {
  async signup(request, reply) {
    try {
      const { email, password } = request.body;
      const result = await authService.signup(email, password);
      return reply.status(201).send(result);
    } catch (error) {
      return reply.status(400).send({ erro: error.message });
    }
  }

  async login(request, reply) {
    try {
      const { email, password } = request.body;
      const result = await authService.login(email, password);
      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(400).send({ erro: error.message });
    }
  }

  async me(request, reply) {
    try {
      return reply.status(200).send(request.user);
    } catch (error) {
      return reply.status(401).send({ erro: error.message });
    }
  }
}

export default new AuthController();
