import prisma from '../../config/prisma.js';

class ResponsavelRepository {
  async findAll() {
    const sql = `SELECT r.*, COALESCE(count(c.id),0) as quantidade_catequizandos FROM "Responsavel" r LEFT JOIN "Catequizando" c ON c.responsavelId = r.id WHERE r.status = 'ativo' GROUP BY r.id`;
    return await prisma.$queryRawUnsafe(sql);
  }

  async findById(id) {
    return await prisma.responsavel.findUnique({ where: { id: Number(id) } });
  }

  async create(data) {
    return await prisma.responsavel.create({ data });
  }

  async update(id, data) {
    return await prisma.responsavel.update({ where: { id: Number(id) }, data });
  }

  async delete(id) {
    return await prisma.responsavel.update({ where: { id: Number(id) }, data: { status: 'inativo' } });
  }
}

export default new ResponsavelRepository();
