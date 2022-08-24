import { ProductInput } from './product.schema';
import prisma from '../utils/prisma';

const options = {
  select: {
    id: true,
    title: true,
    description: true,
    price: true,
    createdAt: true,
    updatedAt: true,
    owner: {
      select: {
        id: true,
        email: true,
        name: true,
      },
    },
  },
};

export const findAllProducts = async () => {
  const products = await prisma.product.findMany(options);
  return products;
};

export const createProduct = async (product: ProductInput & { ownerId: number }) => {
  const products = await prisma.product.create({ data: product, ...options });
  return products;
};
