import { FastifyInstance } from 'fastify';
import getUsersHandler from '../controllers/userController';

const userRoute = async (server: FastifyInstance) => {
  server.get('/', getUsersHandler);
};

export default userRoute;
