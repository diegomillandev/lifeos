import z from 'zod';

export const userSessionSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string().optional(),
}); 

export const userSessionResponseSchema = z.object({
  success: z.boolean(),
  user: userSessionSchema,
});
