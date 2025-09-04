import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { IHabit } from "./Habits";

export interface IArea extends Document {
  name: string;
  habits: PopulatedDoc<IHabit & Document>[];
}

const AreaSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    habits: [
      {
        type: Types.ObjectId,
        ref: "Habit",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const Area = mongoose.models.Area || mongoose.model<IArea>("Area", AreaSchema);
export default Area;
