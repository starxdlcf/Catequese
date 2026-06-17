import prisma from '../../config/prisma.js';

class CatequizandoRepository {
  async findAll() {
    return await prisma.catequizando.findMany();
  }

  async findById(id) {
    return await prisma.catequizando.findUnique({ 
      where: { id: Number(id) } 
    });
  }

  async create(data) {
    // Garante que strings de data vindas do front virem objetos Date válidos para o Prisma/Postgres
    if (data.nascimento) data.nascimento = new Date(data.nascimento);
    if (data.data_batismo) data.data_batismo = new Date(data.data_batismo);
    if (data.data_eucaristia) data.data_eucaristia = new Date(data.data_eucaristia);
    if (data.data_crisma) data.data_crisma = new Date(data.data_crisma);
    
    return await prisma.catequizando.create({ data });
  }

  async update(id, data) {
    if (data.nascimento) data.nascimento = new Date(data.nascimento);
    if (data.data_batismo) data.data_batismo = new Date(data.data_batismo);
    if (data.data_eucaristia) data.data_eucaristia = new Date(data.data_eucaristia);
    if (data.data_crisma) data.data_crisma = new Date(data.data_crisma);

    return await prisma.catequizando.update({
      where: { id: Number(id) },
      data
    });
  }

  async delete(id) {
    return await prisma.catequizando.delete({ 
      where: { id: Number(id) } 
    });
  }
}

module.exports = new CatequizandoRepository();