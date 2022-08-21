import { FastifyReply, FastifyRequest } from 'fastify';
import { findUsers, registerUser, deleteUser, findUserByEmail } from '../services/userService';
import { LoginType, UserType } from '../schemas/userSchema';
import { verifyPassword } from '../utils/hash';
import { server } from '../app';

export const registerUserHandler = async (
  request: FastifyRequest<{ Body: UserType }>,
  reply: FastifyReply
) => {
  try {
    const user = await registerUser(request.body);
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
    const { email, password, ...rest } = request.body;

    const user = await findUserByEmail(email);

    if (!user) return reply.code(404).send({ status: 404, error: 'User not found' });

    const isMatch = await verifyPassword(password, user.password);

    if (!isMatch) return reply.code(401).send({ status: 401, error: 'Password not correct' });

    return reply.code(200).send({ accessToken: server.jwt.sign({ rest }) });
  } catch (err) {
    return reply.code(400).send(err);
  }
};

export const findUsersHandler = async (_: FastifyRequest, reply: FastifyReply) => {
  try {
    const users = await findUsers();
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
