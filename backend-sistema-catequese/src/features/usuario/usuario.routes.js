import usuarioController from './usuario.controller.js';

async function usuarioRoutes(fastify, options) {
  fastify.get('/', usuarioController.listar);
  fastify.get('/:id', usuarioController.buscar);
  fastify.post('/', usuarioController.criar);
  fastify.put('/:id', usuarioController.atualizar);
  fastify.delete('/:id', usuarioController.deletar);
}

export default usuarioRoutes;
