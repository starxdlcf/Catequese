// server.js
import fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import cookie from "@fastify/cookie";
import dotenv from "dotenv";

// Importando as rotas do Fastify
import diaRoutes from './features/dia/dia.routes.js';
import etapaRoutes from './features/etapa/etapa.routes.js';
import localRoutes from './features/local/local.routes.js';
import parentescoRoutes from './features/parentesco/parentesco.routes.js';
import responsavelRoutes from './features/responsavel/responsavel.routes.js';
import tipoUsuarioRoutes from './features/tipoUsuario/tipoUsuario.routes.js';
import usuarioRoutes from './features/usuario/usuario.routes.js';
import catequizandoRoutes from './features/catequisando/catequisando.routes.js';
import catequistaRoutes from './features/catequista/catequista.routes.js';
import entidadeRoutes from './features/Base/routes.js';
import authRoutes from './features/auth/auth.routes.js';

dotenv.config();

const server = fastify({ logger: true });

server.register(cookie, {
  secret: process.env.COOKIE_SECRET || "cookie-secret-change-me",
});

server.register(cors, {
  origin: [
    process.env.FRONTEND_URL || "http://localhost:5173",
    "http://localhost:3003"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

server.decorate("authenticate", async function (request, reply) {
  const authHeader = request.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const neonUrl = process.env.NEON_AUTH_URL;
  const neonKey = process.env.NEON_AUTH_KEY;

  if (!token) {
    return reply.status(401).send({ erro: 'Token não informado.' });
  }

  if (!neonUrl || !neonKey) {
    return reply.status(500).send({ erro: 'NEON_AUTH_URL ou NEON_AUTH_KEY não configurados.' });
  }

  try {
    const response = await fetch(`${neonUrl.replace(/\/$/, '')}/v1/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        apikey: neonKey,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error_description || data.error || 'Token inválido.');
    }

    request.user = await response.json();
  } catch (error) {
    return reply.status(401).send({ erro: error.message || 'Não autorizado.' });
  }
});

server.register(swagger, {
  mode: "dynamic",
  openapi: {
    info: {
      title: "API Sistema de Catequese",
      description: "Documentação da API para o sistema de catequese",
      version: "1.0.0",
    },
    servers: [{ url: `http://localhost:${process.env.PORT || 3002}` }],
  },
});

server.register(swaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "list",
    deepLinking: true,
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
});

// Registra as rotas com seus prefixos.
// Registra as rotas com seus prefixos.

// Ex: Tudo que estiver em usuarioRoutes será acessado via /usuarios:
server.register(entidadeRoutes, { prefix: '/entidades' });
server.register(catequizandoRoutes, { prefix: '/catequizandos' });
server.register(catequistaRoutes, { prefix: '/catequistas' });
server.register(diaRoutes, { prefix: '/dias' });
server.register(etapaRoutes, { prefix: '/etapas' });
server.register(localRoutes, { prefix: '/locais' });
server.register(parentescoRoutes, { prefix: '/parentescos' });
server.register(responsavelRoutes, { prefix: '/responsaveis' });
server.register(tipoUsuarioRoutes, { prefix: '/tipos-usuario' });
server.register(usuarioRoutes, { prefix: '/usuarios' });
server.register(authRoutes, { prefix: '/auth' });


server.get("/", async () => {
  return { status: "online" };
});

const start = async () => {
  try {
    const port = process.env.PORT || 3002;
    await server.listen({
      port: port,
      host: "0.0.0.0",
    });
    console.log(`\n✅ API rodando na porta ${port}`);
    console.log(`\n📚 Documentação disponível em http://localhost:3003/docs\n`);
    // console.log(process.env.DB_CONNECTION_STRING); // <-- Adicione esta linha para verificar a string de conexão se der undefined então falta configurar a variável de ambiente
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
