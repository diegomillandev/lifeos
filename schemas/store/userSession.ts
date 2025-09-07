import z from "zod";

export const userSessionSchema = z.object({
  id: z.uuid().optional().nullable(),
  email: z.email(),
  name: z.string().optional().nullable(),
});

export const userSessionResponseSchema = z.object({
  success: z.boolean(),
  user: userSessionSchema,
});
