import Fastify from 'fastify';
import userRoute from './routes/userRoute';
import { schemas } from './schemas/userSchema';

const server = Fastify({ logger: true });

async function main() {
  for (const schema of schemas) {
    server.addSchema(schema);
  }

  server.register(userRoute, { prefix: 'api/user' });

  try {
    await server.listen({ port: 3000, host: '::' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

main();
