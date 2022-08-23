import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';
import { UserResponse } from '../user/user.schema';

const ProductInput = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
});

const ProductResponse = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  owner: UserResponse,
});

const ProductsResponse = z.array(ProductResponse);

export type ProductInput = z.infer<typeof ProductInput>;

export const { schemas: productSchemas, $ref } = buildJsonSchemas({
  ProductInput,
  ProductResponse,
  ProductsResponse,
});
