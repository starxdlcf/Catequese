import catequizandoController from './catequizando.controller.js';

async function catequizandoRoutes(fastify, options) {
  fastify.get('/', catequizandoController.listar);
  fastify.get('/:id', catequizandoController.buscar);
  fastify.post('/', catequizandoController.criar);
  fastify.put('/:id', catequizandoController.atualizar);
  fastify.delete('/:id', catequizandoController.deletar);
}

module.exports = catequizandoRoutes;