import { z } from "zod";

export const areaSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
