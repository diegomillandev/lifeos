import { NextRequest, NextResponse } from "next/server";
import { RegisterSchema } from "@/schemas/auth";
import { RegisterInput } from "@/types/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import z from "zod";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body: RegisterInput = await req.json();

    const result = RegisterSchema.safeParse(body);
    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors;
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input data",
          errors: fieldErrors,
        },
        { status: 400 }
      );
    }

    const ExitingUser = await User.findOne({ email: result.data.email });
    if (ExitingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User with this email already exists",
        },
        { status: 409 }
      );
    }

    const user = new User(result.data);
    await user.save();

    return NextResponse.json(
      { success: true, message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing POST request", error: String(error) },
      { status: 500 }
    );
  }
}
