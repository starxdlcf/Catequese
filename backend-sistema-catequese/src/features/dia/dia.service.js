import diaRepository from './dia.repository.js';

class DiaService {
  async listarTodos() {
    return await diaRepository.findAll();
  }

  async buscarPorId(id) {
    const item = await diaRepository.findById(id);
    if (!item) throw new Error('Dia não encontrado.');
    return item;
  }

  async criar(dados) {
    if (!dados.nome) throw new Error('Nome do dia é obrigatório.');
    return await diaRepository.create(dados);
  }

  async atualizar(id, dados) {
    await this.buscarPorId(id);
    return await diaRepository.update(id, dados);
  }

  async deletar(id) {
    await this.buscarPorId(id);
    return await diaRepository.delete(id);
  }
}

export default new DiaService();
