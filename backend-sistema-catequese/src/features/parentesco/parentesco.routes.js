import parentescoController from './parentesco.controller.js';

async function parentescoRoutes(fastify, options) {
  fastify.get('/', parentescoController.listar);
  fastify.get('/:id', parentescoController.buscar);
  fastify.post('/', parentescoController.criar);
  fastify.put('/:id', parentescoController.atualizar);
  fastify.delete('/:id', parentescoController.deletar);
}

export default parentescoRoutes;
