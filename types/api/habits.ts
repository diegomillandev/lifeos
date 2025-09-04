import z from "zod";
import { habitSchema } from "@/schemas/habits";

export type HabitTypes = z.infer<typeof habitSchema>;
