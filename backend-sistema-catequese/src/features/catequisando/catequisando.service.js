import catequizandoRepository from './catequisando.repository.js';

class CatequizandoService {
  async listarTodos() {
    return await catequizandoRepository.findAll();
  }

  async buscarPorId(id) {
    const catequizando = await catequizandoRepository.findById(id);
    if (!catequizando) throw new Error('Catequizando não encontrado.');
    return catequizando;
  }

  async criar(dados) {
    if (!dados.nome || !dados.nascimento) {
      throw new Error('Nome e data de nascimento são obrigatórios.');
    }
    return await catequizandoRepository.create(dados);
  }

  async atualizar(id, dados) {
    await this.buscarPorId(id);
    return await catequizandoRepository.update(id, dados);
  }

  async deletar(id) {
    await this.buscarPorId(id);
    return await catequizandoRepository.delete(id);
  }
}

module.exports = new CatequizandoService();