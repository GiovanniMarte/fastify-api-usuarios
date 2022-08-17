import Fastify from 'fastify';
import userRoute from './routes/userRoute';

const server = Fastify({ logger: true });

async function main() {
  server.register(userRoute, { prefix: 'api/users' });

  try {
    await server.listen({ port: 3000, host: '::' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

main();
