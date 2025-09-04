import { z } from "zod";


export const habitSchema = z.object({
  name: z.string().min(1, "Name is required"),
  repeat: z.enum(["daily", "weekly"]),
  daysOfWeek: z.array(z.enum(["mo", "tu", "we", "th", "fr", "sa", "su"])).optional(),
  frecuency: z.number().min(1).max(7).optional().nullable(),
  areas: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")).optional(),
})
.refine((data) => data.repeat === "daily" ? data.daysOfWeek && data.daysOfWeek.length > 0 : true, {
  message: "Select at least one day of the week, when repeat is daily",
 path: ["daysOfWeek"],
})
.refine((data) => data.repeat === "weekly" ? data.frecuency !== null : true, {
  message: "Frecuency is required, when repeat is weekly",
  path: ["frecuency"],
})