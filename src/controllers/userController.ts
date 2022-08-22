import { FastifyReply, FastifyRequest } from 'fastify';
import { findAllUsers, registerUser, deleteUser, findUserByEmail } from '../services/userService';
import { LoginType, UserType } from '../schemas/userSchema';
import { verifyPassword } from '../utils/hash';

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
    const { email, password } = request.body;

    const user = await findUserByEmail(email);

    if (!user) return reply.code(401).send({ status: 401, error: 'User not found' });

    const isMatch = await verifyPassword(password, user.password);

    if (!isMatch) return reply.code(401).send({ status: 401, error: 'Password not correct' });

    const jwt = await reply.jwtSign({ id: user.id, name: user.name });

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
