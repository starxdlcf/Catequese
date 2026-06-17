import prisma from '../../config/prisma.js';

class EntidadeRepository {
  async findAll() { 
    return await prisma.entidade.findMany(); 
  }
  
  async findById(id) { 
    return await prisma.entidade.findUnique({ where: { id: Number(id) } }); 
  }
  
  async create(data) { 
    return await prisma.entidade.create({ data }); 
  }
  
  async update(id, data) { 
    return await prisma.entidade.update({ where: { id: Number(id) }, data }); 
  }
  
  async delete(id) { 
    return await prisma.entidade.delete({ where: { id: Number(id) } }); 
  }
}

module.exports = new EntidadeRepository();