import prisma from '../utils/prisma';
import type { UserInput } from '../schemas/userSchema';
import { hashPassword } from '../utils/hash';

const createUser = async (input: UserInput) => {
  const { password, ...rest } = input;

  const hashedPassword = await hashPassword(password);

  const user = prisma.user.create({
    data: {
      ...rest,
      password: hashedPassword,
    },
  });

  return user;
};

export default createUser;
