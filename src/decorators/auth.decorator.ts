import { FastifyReply, FastifyRequest } from 'fastify';

export const authDecorator = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify();
  } catch (e) {
    return reply.send(e);
  }
};
