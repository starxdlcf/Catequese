import usuarioRepository from './usuario.repository.js';

class UsuarioService {
  async listarTodos() {
    return await usuarioRepository.findAll();
  }

  async buscarPorId(id) {
    const item = await usuarioRepository.findById(id);
    if (!item) throw new Error('Usuário não encontrado.');
    return item;
  }

  async criar(dados) {
    if (!dados.email || !dados.senha) throw new Error('Email e senha são obrigatórios.');
    // regra simples: email único
    const existente = await usuarioRepository.findAll();
    if (existente.find(u => u.email === dados.email)) throw new Error('Email já cadastrado.');
    return await usuarioRepository.create(dados);
  }

  async atualizar(id, dados) {
    await this.buscarPorId(id);
    return await usuarioRepository.update(id, dados);
  }

  async deletar(id) {
    await this.buscarPorId(id);
    return await usuarioRepository.delete(id);
  }
}

export default new UsuarioService();
