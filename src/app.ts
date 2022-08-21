import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import userRoute from './routes/userRoute';
import { authDecorator } from './decorators/authDecorator';

export const server = Fastify({ logger: true });

async function start() {
  server.register(fastifyJwt, { secret: 'supersecret' });
  server.decorate('authenticate', authDecorator);
  server.register(userRoute, { prefix: 'api/user' });

  try {
    await server.listen({ port: 3000, host: '::' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();
