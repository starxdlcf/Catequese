import prisma from '../../config/prisma.js';

class UsuarioRepository {
  async findAll() {
    return await prisma.usuario.findMany({ where: { status: 'ativo' } });
  }

  async findById(id) {
    return await prisma.usuario.findUnique({ where: { id: Number(id) } });
  }

  async create(data) {
    return await prisma.usuario.create({ data });
  }

  async update(id, data) {
    return await prisma.usuario.update({ where: { id: Number(id) }, data });
  }

  async delete(id) {
    return await prisma.usuario.update({ where: { id: Number(id) }, data: { status: 'inativo' } });
  }

  async findAllWithTipo() {
    const sql = `SELECT u.*, t.nome as tipo_nome FROM "Usuario" u INNER JOIN "TipoUsuario" t ON u.tipoUsuarioId = t.id WHERE u.status = 'ativo'`;
    return await prisma.$queryRawUnsafe(sql);
  }
}

export default new UsuarioRepository();
