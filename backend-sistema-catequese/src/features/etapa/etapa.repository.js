import prisma from '../../config/prisma.js';

class EtapaRepository {
  async findAll() {
    const sql = `SELECT e.*, d.nome as dia_nome FROM "Etapa" e INNER JOIN "Dia" d ON e.diaId = d.id WHERE e.status = 'ativo'`;
    return await prisma.$queryRawUnsafe(sql);
  }

  async findById(id) {
    return await prisma.etapa.findUnique({ where: { id: Number(id) } });
  }

  async create(data) {
    return await prisma.etapa.create({ data });
  }

  async update(id, data) {
    return await prisma.etapa.update({ where: { id: Number(id) }, data });
  }

  async delete(id) {
    return await prisma.etapa.update({ where: { id: Number(id) }, data: { status: 'inativo' } });
  }
}

export default new EtapaRepository();
