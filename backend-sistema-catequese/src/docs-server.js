import fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";

dotenv.config();

const docsServer = fastify({ logger: true });

docsServer.register(cors, {
  origin: true,
});

const apiHost = process.env.API_HOST || "http://localhost:3002";
const docsPort = process.env.DOCS_PORT || 3003;

const redirectTarget = `${apiHost}/docs`;

docsServer.get("/", async (request, reply) => {
  return reply.redirect(redirectTarget);
});

docsServer.get("/docs", async (request, reply) => {
  return reply.redirect(redirectTarget);
});

docsServer.get("/reference", async (request, reply) => {
  return reply.redirect(redirectTarget);
});

docsServer.get("/reference/", async (request, reply) => {
  return reply.redirect(redirectTarget);
});

const start = async () => {
  try {
    await docsServer.listen({
      port: docsPort,
      host: "0.0.0.0",
    });
    console.log(`\n✅ Servidor de documentação rodando na porta ${docsPort}`);
    console.log(`   🔷 Swagger UI: http://localhost:${docsPort}/docs`);
    console.log(`   🔶 Swagger spec URL: ${apiHost}/docs/json\n`);
  } catch (err) {
    docsServer.log.error(err);
    process.exit(1);
  }
};

start();
