import { FastifyInstance } from 'fastify';
import createUserHandler from '../controllers/userController';

const userRoute = async (server: FastifyInstance) => {
  server.get('/:password', createUserHandler);
};

export default userRoute;
