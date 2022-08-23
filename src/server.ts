import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import userRoute from './user/user.route';
import { authDecorator } from './decorators/auth.decorator';
import productRoute from './product/product.route';
import fastifySwagger from '@fastify/swagger';
import { withRefResolver } from 'fastify-zod';
import { SWAGGER_CONFIG } from './utils/swagger.config';

const build = () => {
  const server = fastify({ logger: true });

  server.register(fastifyJwt, { secret: 'supersecret' });

  server.decorate('authenticate', authDecorator);

  server.register(fastifySwagger, withRefResolver(SWAGGER_CONFIG));

  server.register(userRoute, { prefix: 'api/user' });

  server.register(productRoute, { prefix: 'api/product' });

  return server;
};

export default build;
