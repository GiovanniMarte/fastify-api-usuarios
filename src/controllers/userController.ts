import { FastifyReply, FastifyRequest } from 'fastify';
import createUser from '../services/userService';
import { UserInput } from '../schemas/userSchema';

const createUserHandler = async (
  request: FastifyRequest<{ Body: UserInput }>,
  reply: FastifyReply
) => {
  try {
    const user = await createUser(request.body);
    return reply.code(201).send(user);
  } catch (err) {
    console.error(err);
    return reply.code(500).send(err);
  }
};

export default createUserHandler;
