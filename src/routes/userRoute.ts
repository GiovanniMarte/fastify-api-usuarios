import { FastifyInstance } from 'fastify';
import createUserHandler from '../controllers/userController';
import { $ref } from '../schemas/userSchema';
const userRoute = async (server: FastifyInstance) => {
  server.post(
    '/',
    { schema: { body: $ref('User'), response: { 201: $ref('UserDTO') } } },
    createUserHandler
  );
};

export default userRoute;
