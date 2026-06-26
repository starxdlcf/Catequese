import parentescoRepository from './parentesco.repository.js';

class ParentescoService {
  async listarTodos() {
    return await parentescoRepository.findAll();
  }

  async buscarPorId(id) {
    const item = await parentescoRepository.findById(id);
    if (!item) throw new Error('Parentesco não encontrado.');
    return item;
  }

  async criar(dados) {
    if (!dados.nome) throw new Error('Nome do parentesco é obrigatório.');
    return await parentescoRepository.create(dados);
  }

  async atualizar(id, dados) {
    await this.buscarPorId(id);
    return await parentescoRepository.update(id, dados);
  }

  async deletar(id) {
    await this.buscarPorId(id);
    return await parentescoRepository.delete(id);
  }
}

export default new ParentescoService();
