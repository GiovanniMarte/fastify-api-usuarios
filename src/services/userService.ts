import prisma from '../utils/prisma';
import type { UserInput } from '../schemas/userSchema';

const createUser = async (input: UserInput) => {
  const user = prisma.user.create({
    data: input,
  });
};
