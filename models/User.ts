import { hashPassword } from "@/utils/bcrypt";
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username?: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await hashPassword(this.password);
  next();
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
