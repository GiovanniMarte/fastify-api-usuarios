import { FastifyInstance } from 'fastify';
import { createProductHandler, findAllProductsHandler } from '../controllers/productController';
import { $ref, productSchemas } from '../schemas/productSchema';

const productRoute = async (server: FastifyInstance) => {
  for (const schema of productSchemas) {
    server.addSchema(schema);
  }

  server.get(
    '/',
    { schema: { response: { 200: $ref('ProductsResponse') } }, onRequest: [server.authenticate] },
    findAllProductsHandler
  );

  server.post(
    '/',
    {
      schema: { body: $ref('ProductInput'), response: { 200: $ref('ProductResponse') } },
      onRequest: [server.authenticate],
    },
    createProductHandler
  );
};

export default productRoute;
