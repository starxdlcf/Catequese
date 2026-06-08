const entidadeRepository = require('./entidade.repository');

class EntidadeService {
  async listarTodos() { 
    return await entidadeRepository.findAll(); 
  }
  
  async buscarPorId(id) {
    const item = await entidadeRepository.findById(id);
    if (!item) throw new Error('Registro não encontrado.');
    return item;
  }
  
  async criar(dados) { 
    return await entidadeRepository.create(dados); 
  }
  
  async atualizar(id, dados) {
    await this.buscarPorId(id);
    return await entidadeRepository.update(id, dados);
  }
  
  async deletar(id) {
    await this.buscarPorId(id);
    return await entidadeRepository.delete(id);
  }
}

module.exports = new EntidadeService();