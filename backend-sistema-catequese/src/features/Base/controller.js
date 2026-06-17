import entidadeService from './entidade.service.js';

class EntidadeController {
  async listar(request, reply) {
    try { 
      const dados = await entidadeService.listarTodos();
      return reply.status(200).send(dados); 
    } catch (error) { 
      return reply.status(500).send({ erro: error.message }); 
    }
  }

  async buscar(request, reply) {
    try { 
      const dado = await entidadeService.buscarPorId(request.params.id);
      return reply.status(200).send(dado); 
    } catch (error) { 
      return reply.status(404).send({ erro: error.message }); 
    }
  }

  async criar(request, reply) {
    try { 
      const novoItem = await entidadeService.criar(request.body);
      return reply.status(201).send(novoItem); 
    } catch (error) { 
      return reply.status(400).send({ erro: error.message }); 
    }
  }

  async atualizar(request, reply) {
    try { 
      const itemAtualizado = await entidadeService.atualizar(request.params.id, request.body);
      return reply.status(200).send(itemAtualizado); 
    } catch (error) { 
      return reply.status(400).send({ erro: error.message }); 
    }
  }

  async deletar(request, reply) {
    try { 
      await entidadeService.deletar(request.params.id);
      return reply.status(204).send(); 
    } catch (error) { 
      return reply.status(400).send({ erro: error.message }); 
    }
  }
}

module.exports = new EntidadeController();