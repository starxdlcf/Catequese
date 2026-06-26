import localService from './local.service.js';

class LocalController {
  async listar(request, reply) {
    try {
      const dados = await localService.listarTodos();
      return reply.status(200).send(dados);
    } catch (error) {
      return reply.status(500).send({ erro: error.message });
    }
  }

  async buscar(request, reply) {
    try {
      const dado = await localService.buscarPorId(request.params.id);
      return reply.status(200).send(dado);
    } catch (error) {
      return reply.status(404).send({ erro: error.message });
    }
  }

  async criar(request, reply) {
    try {
      const novo = await localService.criar(request.body);
      return reply.status(201).send(novo);
    } catch (error) {
      return reply.status(400).send({ erro: error.message });
    }
  }

  async atualizar(request, reply) {
    try {
      const atualizado = await localService.atualizar(request.params.id, request.body);
      return reply.status(200).send(atualizado);
    } catch (error) {
      return reply.status(400).send({ erro: error.message });
    }
  }

  async deletar(request, reply) {
    try {
      await localService.deletar(request.params.id);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(400).send({ erro: error.message });
    }
  }
}

export default new LocalController();
