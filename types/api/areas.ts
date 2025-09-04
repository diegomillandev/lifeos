import z from "zod";
import { areaSchema } from "@/schemas/areas";

export type AreaTypes = z.infer<typeof areaSchema>;
