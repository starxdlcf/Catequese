import responsavelController from './responsavel.controller.js';

async function responsavelRoutes(fastify, options) {
  fastify.get('/', responsavelController.listar);
  fastify.get('/:id', responsavelController.buscar);
  fastify.post('/', responsavelController.criar);
  fastify.put('/:id', responsavelController.atualizar);
  fastify.delete('/:id', responsavelController.deletar);
}

export default responsavelRoutes;
