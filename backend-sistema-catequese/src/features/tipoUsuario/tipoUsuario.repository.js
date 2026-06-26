import prisma from '../../config/prisma.js';

class TipoUsuarioRepository {
  async findAll() {
    return await prisma.tipoUsuario.findMany({ where: { status: 'ativo' } });
  }

  async findById(id) {
    return await prisma.tipoUsuario.findUnique({ where: { id: Number(id) } });
  }

  async create(data) {
    return await prisma.tipoUsuario.create({ data });
  }

  async update(id, data) {
    return await prisma.tipoUsuario.update({ where: { id: Number(id) }, data });
  }

  async delete(id) {
    return await prisma.tipoUsuario.update({ where: { id: Number(id) }, data: { status: 'inativo' } });
  }

  async findAllWithUsers() {
    const sql = 
    `SELECT t.*,
    u.id as usuario_id,
    u.nome as usuario_nome FROM "TipoUsuario" t INNER JOIN "Usuario" u ON u.tipoUsuarioId = t.id WHERE t.status = 'ativo' AND u.status = 'ativo'`;
    return await prisma.$queryRawUnsafe(sql);
  }
}

export default new TipoUsuarioRepository();
