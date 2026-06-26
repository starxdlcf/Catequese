import prisma from '../../config/prisma.js';

class ParentescoRepository {
  async findAll() {
    return await prisma.parentesco.findMany({ where: { status: 'ativo' } });
  }

  async findById(id) {
    return await prisma.parentesco.findUnique({ where: { id: Number(id) } });
  }

  async create(data) {
    return await prisma.parentesco.create({ data });
  }

  async update(id, data) {
    return await prisma.parentesco.update({ where: { id: Number(id) }, data });
  }

  async delete(id) {
    return await prisma.parentesco.update({ where: { id: Number(id) }, data: { status: 'inativo' } });
  }
}

export default new ParentescoRepository();
