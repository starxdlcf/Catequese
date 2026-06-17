import catequistaRepository from './catequista.repository.js';

class CatequistaService {
  async listarTodos() {
    return await catequistaRepository.findAll();
  }

  async buscarPorId(id) {
    const catequista = await catequistaRepository.findById(id);
    if (!catequista) throw new Error('Catequista não encontrado.');
    return catequista;
  }

  async criar(dados) {
    if (!dados.nome) throw new Error('O nome do catequista é obrigatório.');
    return await catequistaRepository.create(dados);
  }

  async atualizar(id, dados) {
    await this.buscarPorId(id);
    return await catequistaRepository.update(id, dados);
  }

  async deletar(id) {
    await this.buscarPorId(id);
    return await catequistaRepository.delete(id);
  }
}

export default new CatequistaService();