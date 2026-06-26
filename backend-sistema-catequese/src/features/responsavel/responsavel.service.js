import responsavelRepository from './responsavel.repository.js';
import prisma from '../../config/prisma.js';

class ResponsavelService {
  async listarTodos() {
    return await responsavelRepository.findAll();
  }

  async buscarPorId(id) {
    const item = await responsavelRepository.findById(id);
    if (!item) throw new Error('Responsável não encontrado.');
    return item;
  }

  async criar(dados) {
    if (!dados.nome) throw new Error('Nome do responsável é obrigatório.');
    return await responsavelRepository.create(dados);
  }

  async atualizar(id, dados) {
    await this.buscarPorId(id);
    return await responsavelRepository.update(id, dados);
  }

  async deletar(id) {
    // Regra de negócio: não permitir excluir responsável que tenha catequizandos vinculados
    const count = await prisma.catequizando.count({ where: { responsavelId: Number(id) } });
    if (count > 0) throw new Error('Não é possível excluir: existem catequizandos vinculados a este responsável.');
    await responsavelRepository.delete(id);
  }
}

export default new ResponsavelService();
