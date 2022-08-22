import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import userRoute from './user/userRoute';
import { authDecorator } from './decorators/authDecorator';
import productRoute from './product/productRoute';
import fastifySwagger from '@fastify/swagger';
import { withRefResolver } from 'fastify-zod';
import { SWAGGER_CONFIG } from './utils/swaggerConfig';

const buildServer = () => {
  const server = Fastify({ logger: true });

  server.register(fastifyJwt, { secret: 'supersecret' });

  server.decorate('authenticate', authDecorator);

  server.register(fastifySwagger, withRefResolver(SWAGGER_CONFIG));

  server.register(userRoute, { prefix: 'api/user' });

  server.register(productRoute, { prefix: 'api/product' });

  return server;
};

export default buildServer;
