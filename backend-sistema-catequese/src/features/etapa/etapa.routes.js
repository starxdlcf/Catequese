import etapaController from './etapa.controller.js';

async function etapaRoutes(fastify, options) {
  fastify.get('/', etapaController.listar);
  fastify.get('/:id', etapaController.buscar);
  fastify.post('/', etapaController.criar);
  fastify.put('/:id', etapaController.atualizar);
  fastify.delete('/:id', etapaController.deletar);
}

export default etapaRoutes;
