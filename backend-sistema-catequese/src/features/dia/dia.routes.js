import diaController from './dia.controller.js';

async function diaRoutes(fastify, options) {
  fastify.get('/', diaController.listar);
  fastify.get('/:id', diaController.buscar);
  fastify.post('/', diaController.criar);
  fastify.put('/:id', diaController.atualizar);
  fastify.delete('/:id', diaController.deletar);
}

export default diaRoutes;
