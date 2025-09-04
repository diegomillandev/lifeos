import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { IArea } from "./Areas";

export type Repeat = "daily" | "weekly";
export type DayOfWeek = "mo" | "tu" | "we" | "th" | "fr" | "sa" | "su";

export interface IHabit extends Document {
  name: string;
  repeat: Repeat;
  daysOfWeek: DayOfWeek[];
  frequency: number | null;
  areas: PopulatedDoc<IArea & Document>[];
}

const HabitSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    repeat: { type: String, enum: ["daily", "weekly"], required: true },
    daysOfWeek: {
      type: [String],
      enum: ["mo", "tu", "we", "th", "fr", "sa", "su"],
      default: [],
    },
    frequency: { type: Number, default: null },
    areas: [
      {
        type: Types.ObjectId,
        ref: "Area",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Habit =
  mongoose.models.Habit || mongoose.model<IHabit>("Habit", HabitSchema);
export default Habit;
