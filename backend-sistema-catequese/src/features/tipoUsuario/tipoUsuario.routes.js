import tipoUsuarioController from './tipoUsuario.controller.js';

async function tipoUsuarioRoutes(fastify, options) {
  fastify.get('/', tipoUsuarioController.listar);
  fastify.get('/:id', tipoUsuarioController.buscar);
  fastify.post('/', tipoUsuarioController.criar);
  fastify.put('/:id', tipoUsuarioController.atualizar);
  fastify.delete('/:id', tipoUsuarioController.deletar);
}

export default tipoUsuarioRoutes;
