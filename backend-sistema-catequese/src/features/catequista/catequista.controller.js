const catequistaService = require('./catequista.service');

class CatequistaController {
  async listar(request, reply) {
    try {
      const catequistas = await catequistaService.listarTodos();
      return reply.status(200).send(catequistas);
    } catch (error) {
      return reply.status(500).send({ erro: error.message });
    }
  }

  async buscar(request, reply) {
    try {
      const { id } = request.params;
      const catequista = await catequistaService.buscarPorId(id);
      return reply.status(200).send(catequista);
    } catch (error) {
      return reply.status(404).send({ erro: error.message });
    }
  }

  async criar(request, reply) {
    try {
      const catequista = await catequistaService.criar(request.body);
      return reply.status(201).send(catequista);
    } catch (error) {
      return reply.status(400).send({ erro: error.message });
    }
  }

  async atualizar(request, reply) {
    try {
      const { id } = request.params;
      const catequista = await catequistaService.atualizar(id, request.body);
      return reply.status(200).send(catequista);
    } catch (error) {
      return reply.status(400).send({ erro: error.message });
    }
  }

  async deletar(request, reply) {
    try {
      const { id } = request.params;
      await catequistaService.deletar(id);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(400).send({ erro: error.message });
    }
  }
}

module.exports = new CatequistaController();