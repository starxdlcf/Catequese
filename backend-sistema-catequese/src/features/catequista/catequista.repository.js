import prisma from '../../config/prisma.js';

class CatequistaRepository {
  async findAll() {
    return await prisma.catequista.findMany({ where: { status: 'ativo' } });
  }

  async findById(id) {
    return await prisma.catequista.findUnique({
      where: { id: Number(id) }
    });
  }

  async create(data) {
    return await prisma.catequista.create({ data });
  }

  async update(id, data) {
    return await prisma.catequista.update({
      where: { id: Number(id) },
      data
    });
  }

  async delete(id) {
    return await prisma.catequista.update({
      where: { id: Number(id) },
      data: { status: 'inativo' }
    });
  }
}

export default new CatequistaRepository();