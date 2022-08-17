import { FastifyReply, FastifyRequest } from 'fastify';

const getUsersHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  return [
    {
      name: 'Giova',
      age: 23,
    },
  ];
};

export default getUsersHandler;
