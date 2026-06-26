import etapaRepository from './etapa.repository.js';

class EtapaService {
  async listarTodos() {
    return await etapaRepository.findAll();
  }

  async buscarPorId(id) {
    const item = await etapaRepository.findById(id);
    if (!item) throw new Error('Etapa não encontrada.');
    return item;
  }

  async criar(dados) {
    if (!dados.nome || !dados.diaId) throw new Error('Nome e diaId são obrigatórios.');
    return await etapaRepository.create(dados);
  }

  async atualizar(id, dados) {
    await this.buscarPorId(id);
    return await etapaRepository.update(id, dados);
  }

  async deletar(id) {
    await this.buscarPorId(id);
    return await etapaRepository.delete(id);
  }
}

export default new EtapaService();
