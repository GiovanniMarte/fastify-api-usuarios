import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const UserBase = {
  name: z.string(),
  email: z.string().email(),
};

const User = z.object({
  ...UserBase,
  password: z.string(),
});

export const UserResponse = z.object({
  id: z.number(),
  ...UserBase,
});

const Login = z.object({
  email: z.string().email(),
  password: z.string(),
});

const LoginResponse = z.object({
  accessToken: z.string(),
});

export type UserType = z.infer<typeof User>;

export type LoginType = z.infer<typeof Login>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  User,
  UserResponse,
  Login,
  LoginResponse,
});
