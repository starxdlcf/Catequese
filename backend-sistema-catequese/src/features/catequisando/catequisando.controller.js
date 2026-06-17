import catequizandoService from './catequisando.service.js';

class CatequizandoController {
  async listar(request, reply) {
    try {
      const catequizandos = await catequizandoService.listarTodos();
      return reply.status(200).send(catequizandos);
    } catch (error) {
      return reply.status(500).send({ erro: error.message });
    }
  }

  async buscar(request, reply) {
    try {
      const catequizando = await catequizandoService.buscarPorId(request.params.id);
      return reply.status(200).send(catequizando);
    } catch (error) {
      return reply.status(404).send({ erro: error.message });
    }
  }

  async criar(request, reply) {
    try {
      const catequizando = await catequizandoService.criar(request.body);
      return reply.status(201).send(catequizando);
    } catch (error) {
      return reply.status(400).send({ erro: error.message });
    }
  }

  async atualizar(request, reply) {
    try {
      const catequizando = await catequizandoService.atualizar(request.params.id, request.body);
      return reply.status(200).send(catequizando);
    } catch (error) {
      return reply.status(400).send({ erro: error.message });
    }
  }

  async deletar(request, reply) {
    try {
      await catequizandoService.deletar(request.params.id);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(400).send({ erro: error.message });
    }
  }
}

module.exports = new CatequizandoController();