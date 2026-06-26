import localController from './local.controller.js';

async function localRoutes(fastify, options) {
  fastify.get('/', localController.listar);
  fastify.get('/:id', localController.buscar);
  fastify.post('/', localController.criar);
  fastify.put('/:id', localController.atualizar);
  fastify.delete('/:id', localController.deletar);
}

export default localRoutes;
