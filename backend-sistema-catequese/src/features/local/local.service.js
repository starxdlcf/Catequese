import localRepository from './local.repository.js';

class LocalService {
  async listarTodos() {
    return await localRepository.findAll();
  }

  async buscarPorId(id) {
    const item = await localRepository.findById(id);
    if (!item) throw new Error('Local não encontrado.');
    return item;
  }

  async criar(dados) {
    if (!dados.nome) throw new Error('Nome do local é obrigatório.');
    return await localRepository.create(dados);
  }

  async atualizar(id, dados) {
    await this.buscarPorId(id);
    return await localRepository.update(id, dados);
  }

  async deletar(id) {
    await this.buscarPorId(id);
    return await localRepository.delete(id);
  }
}

export default new LocalService();
