import { FastifyReply, FastifyRequest } from 'fastify';
import { ProductInput } from './product.schema';
import { createProduct, findAllProducts } from './product.service';

export const findAllProductsHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const users = await findAllProducts();
    reply.code(200).send(users);
  } catch (err) {
    reply.code(400).send(err);
  }
};

export const createProductHandler = async (
  request: FastifyRequest<{ Body: ProductInput }>,
  reply: FastifyReply
) => {
  try {
    const product = await createProduct({ ...request.body, ownerId: request.user.id });
    reply.code(201).send(product);
  } catch (err) {
    reply.code(400).send(err);
  }
};
