import tipoUsuarioRepository from './tipoUsuario.repository.js';

class TipoUsuarioService {
  async listarTodos() {
    return await tipoUsuarioRepository.findAll();
  }

  async buscarPorId(id) {
    const item = await tipoUsuarioRepository.findById(id);
    if (!item) throw new Error('Tipo de usuário não encontrado.');
    return item;
  }

  async criar(dados) {
    if (!dados.nome) throw new Error('Nome do tipo é obrigatório.');
    return await tipoUsuarioRepository.create(dados);
  }

  async atualizar(id, dados) {
    await this.buscarPorId(id);
    return await tipoUsuarioRepository.update(id, dados);
  }

  async deletar(id) {
    await this.buscarPorId(id);
    return await tipoUsuarioRepository.delete(id);
  }
}

export default new TipoUsuarioService();
