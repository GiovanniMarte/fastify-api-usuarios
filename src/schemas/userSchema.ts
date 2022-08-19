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

const UserDTO = z.object({
  id: z.string(),
  ...UserBase,
});

export const { schemas, $ref } = buildJsonSchemas({ User, UserDTO });

export type UserInput = z.infer<typeof User>;
