const { PrismaClient } = require('@prisma/client');

// No ambiente de desenvolvimento, o Nodemon reinicia o servidor a cada alteração de código.
// Usar o objeto 'global' garante que o Prisma não crie uma nova instância de conexão a cada recarregamento.
const prisma = global.prisma || new PrismaClient({
  log: ['query', 'error', 'warn'], // Opcional: mostra as queries SQL executadas no terminal (ótimo para debugar)
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

module.exports = prisma;