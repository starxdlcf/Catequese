import prisma from '../../config/prisma.js';

class DiaRepository {
  async findAll() {
    return await prisma.dia.findMany({ where: { status: 'ativo' } });
  }

  async findById(id) {
    return await prisma.dia.findUnique({ where: { id: Number(id) } });
  }

  async create(data) {
    return await prisma.dia.create({ data });
  }

  async update(id, data) {
    return await prisma.dia.update({ where: { id: Number(id) }, data });
  }

  async delete(id) {
    return await prisma.dia.update({ where: { id: Number(id) }, data: { status: 'inativo' } });
  }
}

export default new DiaRepository();
