import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import userRoute from './routes/userRoute';
import { authDecorator } from './decorators/authDecorator';
import productRoute from './routes/productRoute';
import fastifySwagger from '@fastify/swagger';
import { withRefResolver } from 'fastify-zod';
import { SWAGGER_CONFIG } from './utils/swaggerConfig';

const server = Fastify({ logger: true });

async function start() {
  server.register(fastifyJwt, { secret: 'supersecret' });

  server.decorate('authenticate', authDecorator);

  server.register(fastifySwagger, withRefResolver(SWAGGER_CONFIG));

  server.register(userRoute, { prefix: 'api/user' });
  server.register(productRoute, { prefix: 'api/product' });

  try {
    await server.listen({ port: 3000, host: '::' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();
