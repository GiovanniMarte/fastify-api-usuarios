import fastify from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: any;
  }
}
