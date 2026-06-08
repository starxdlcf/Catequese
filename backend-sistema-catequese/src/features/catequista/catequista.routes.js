const catequistaController = require('./catequista.controller');

async function catequistaRoutes(fastify, options) {
  fastify.get('/', catequistaController.listar);
  fastify.get('/:id', catequistaController.buscar);
  fastify.post('/', catequistaController.criar);
  fastify.put('/:id', catequistaController.atualizar);
  fastify.delete('/:id', catequistaController.deletar);
}

module.exports = catequistaRoutes;