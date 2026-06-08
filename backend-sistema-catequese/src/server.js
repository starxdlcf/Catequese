// server.js
import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import cookie from "@fastify/cookie";
import dotenv from "dotenv";

// Importando as rotas do Fastify

// exemplo: import usuarioRoutes from "./routes/usuarioRoutes.js";

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

server.register(jwt, {
  secret: process.env.JWT_SECRET || "jwt-secret-change-me",
  cookie: {
    cookieName: "token",
    signed: false,
  },
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

// Ex: Tudo que estiver em usuarioRoutes será acessado via /usuarios:
// server.register(usuarioRoutes, { prefix: "/usuarios" });


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
