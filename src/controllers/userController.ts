import { FastifyReply, FastifyRequest } from 'fastify';
import { verifyPassword, hashPassword } from '../utils/hash';

const createUserHandler = async (
  request: FastifyRequest<{ Params: { password: string } }>,
  reply: FastifyReply
) => {
  const hashedPassword = await hashPassword('giovamixz');
  const result = await verifyPassword(request.params.password, hashedPassword);
  reply.header('hello', 123);
  return { result };
};

export default createUserHandler;
