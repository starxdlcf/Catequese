const prisma = require('../../config/prisma');

class CatequistaRepository {
  async findAll() {
    return await prisma.catequista.findMany();
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
    return await prisma.catequista.delete({
      where: { id: Number(id) }
    });
  }
}

module.exports = new CatequistaRepository();