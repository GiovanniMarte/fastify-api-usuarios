import prisma from '../utils/prisma';
import type { UserType } from './user.schema';
import { hashPassword } from '../utils/hash';

export const registerUser = async (input: UserType) => {
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

export const findUserByEmail = async (email: string) => {
  const user = prisma.user.findUnique({ where: { email: email } });
  return user;
};

export const findAllUsers = async () => {
  const users = prisma.user.findMany({ select: { id: true, email: true, name: true } });
  return users;
};

export const deleteUser = async (id: number) => {
  const deletedUser = prisma.user.delete({
    where: { id: id },
    select: { id: true, email: true, name: true },
  });
  return deletedUser;
};
