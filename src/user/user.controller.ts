import { FastifyReply, FastifyRequest } from 'fastify';
import { findAllUsers, createUser, deleteUser, findUserByEmail } from './user.service';
import { LoginType, UserType } from './user.schema';
import { verifyPassword } from '../utils/hash';
import { ReplyError } from '../errors/ReplyError';

export const createUserHandler = async (
  request: FastifyRequest<{ Body: UserType }>,
  reply: FastifyReply
) => {
  try {
    const user = await createUser(request.body);
    return reply.code(201).send(user);
  } catch (err) {
    console.error(err);
    return reply.code(400).send(err);
  }
};

export const authUserHandler = async (
  request: FastifyRequest<{ Body: LoginType }>,
  reply: FastifyReply
) => {
  try {
    const { email, password } = request.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return reply.code(401).send(new ReplyError(401, 'Unauthorized', 'user not found'));
    }

    const isMatch = await verifyPassword(password, user.password);

    if (!isMatch) {
      return reply.code(401).send(new ReplyError(401, 'Unauthorized', 'password is incorrect'));
    }

    const jwt = await reply.jwtSign({ id: user.id, email: user.email });

    return reply.code(200).send({ accessToken: jwt });
  } catch (err) {
    return reply.code(400).send(err);
  }
};

export const findAllUsersHandler = async (_: FastifyRequest, reply: FastifyReply) => {
  try {
    const users = await findAllUsers();
    return reply.code(201).send(users);
  } catch (err) {
    return reply.code(400).send(err);
  }
};

export const deleteUserHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const user = await deleteUser(+request.params.id);
    return reply.code(201).send(user);
  } catch (err) {
    return reply.code(400).send(err);
  }
};
