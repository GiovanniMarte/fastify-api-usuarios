import { FastifyDynamicSwaggerOptions } from '@fastify/swagger';
import { version } from '../../package.json';

export const SWAGGER_CONFIG: FastifyDynamicSwaggerOptions = {
  routePrefix: '/docs',
  exposeRoute: true,
  staticCSP: true,
  openapi: {
    info: {
      title: 'Fastify API',
      description: 'Products and users',
      version: version,
    },
  },
};
