import { z } from 'zod';

const User = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
});

export type UserInput = z.infer<typeof User>;
