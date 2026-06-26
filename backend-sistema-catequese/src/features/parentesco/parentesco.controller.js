import parentescoService from './parentesco.service.js';

class ParentescoController {
  async listar(request, reply) {
    try {
      const dados = await parentescoService.listarTodos();
      return reply.status(200).send(dados);
    } catch (error) {
      return reply.status(500).send({ erro: error.message });
    }
  }

  async buscar(request, reply) {
    try {
      const dado = await parentescoService.buscarPorId(request.params.id);
      return reply.status(200).send(dado);
    } catch (error) {
      return reply.status(404).send({ erro: error.message });
    }
  }

  async criar(request, reply) {
    try {
      const novo = await parentescoService.criar(request.body);
      return reply.status(201).send(novo);
    } catch (error) {
      return reply.status(400).send({ erro: error.message });
    }
  }

  async atualizar(request, reply) {
    try {
      const atualizado = await parentescoService.atualizar(request.params.id, request.body);
      return reply.status(200).send(atualizado);
    } catch (error) {
      return reply.status(400).send({ erro: error.message });
    }
  }

  async deletar(request, reply) {
    try {
      await parentescoService.deletar(request.params.id);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(400).send({ erro: error.message });
    }
  }
}

export default new ParentescoController();
