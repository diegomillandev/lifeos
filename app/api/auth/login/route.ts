import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import z from "zod";
import { LoginSchema } from "@/schemas/auth";
import { comparePassword } from "@/utils/bcrypt";
import { generateJWT } from "@/utils/jwt";
import { LoginInput } from "@/types/api/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body: LoginInput = await req.json();

    const result = LoginSchema.safeParse(body);
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

    const user = await User.findOne({ email: result.data.email });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 404 }
      );
    }

    const isPasswordValid = await comparePassword(
      result.data.password,
      user.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = generateJWT(user._id.toString());

    return NextResponse.json(
      {
        success: true,
        message: "Authentication successful",
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing POST request", error: String(error) },
      { status: 500 }
    );
  }
}
