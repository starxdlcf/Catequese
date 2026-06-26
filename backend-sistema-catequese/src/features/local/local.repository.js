import prisma from '../../config/prisma.js';

class LocalRepository {
  async findAll() {
    return await prisma.local.findMany({ where: { status: 'ativo' } });
  }

  async findById(id) {
    return await prisma.local.findUnique({ where: { id: Number(id) } });
  }

  async create(data) {
    return await prisma.local.create({ data });
  }

  async update(id, data) {
    return await prisma.local.update({ where: { id: Number(id) }, data });
  }

  async delete(id) {
    return await prisma.local.update({ where: { id: Number(id) }, data: { status: 'inativo' } });
  }
}

export default new LocalRepository();
