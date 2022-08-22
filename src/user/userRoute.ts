import { FastifyInstance } from 'fastify';
import {
  findAllUsersHandler,
  registerUserHandler,
  deleteUserHandler,
  authUserHandler,
} from './userController';
import { userSchemas, $ref } from './userSchema';

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

  server.get('/', { onRequest: [server.authenticate] }, findAllUsersHandler);

  server.delete(
    '/:id',
    { schema: { response: { 200: $ref('UserResponse') } }, onRequest: [server.authenticate] },
    deleteUserHandler
  );
};

export default userRoute;
