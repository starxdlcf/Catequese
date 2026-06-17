import entidadeController from './entidade.controller.js';

async function entidadeRoutes(fastify, options) {
  fastify.get('/', entidadeController.listar);
  fastify.get('/:id', entidadeController.buscar);
  fastify.post('/', entidadeController.criar);
  fastify.put('/:id', entidadeController.atualizar);
  fastify.delete('/:id', entidadeController.deletar);
}

module.exports = entidadeRoutes;