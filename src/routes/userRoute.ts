import { FastifyInstance } from 'fastify';
import {
  findUsersHandler,
  registerUserHandler,
  deleteUserHandler,
  authUserHandler,
} from '../controllers/userController';
import { userSchemas, $ref } from '../schemas/userSchema';

const userRoute = async (server: FastifyInstance) => {
  for (const schema of userSchemas) {
    server.addSchema(schema);
  }

  server.post(
    '/register',
    { schema: { body: $ref('User'), response: { 201: $ref('UserResponse') } } },
    registerUserHandler
  );

  server.post(
    '/auth',
    {
      schema: {
        body: $ref('Login'),
        response: { 200: $ref('LoginResponse') },
      },
    },
    authUserHandler
  );

  server.get('/', findUsersHandler);

  server.delete('/:id', { schema: { response: { 200: $ref('UserResponse') } } }, deleteUserHandler);
};

export default userRoute;
