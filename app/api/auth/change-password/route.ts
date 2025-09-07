import { NextRequest, NextResponse } from "next/server";
import { ChangePasswordSchema } from "@/schemas/auth";
import { comparePassword } from "@/utils/bcrypt";
import { verifyJWT } from "@/utils/jwt";
import { headers } from "next/headers";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import z from "zod";

export async function POST(req: NextRequest) {
  try {
    const headerList = await headers();
    const token = headerList.get("token");

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Token not provided",
        },
        { status: 400 }
      );
    }

    const body = await req.json();

    const result = ChangePasswordSchema.safeParse(body);
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

    try {
      const decoded = await verifyJWT(token);
      await connectDB();

      if (decoded.payload.id) {
        const userFind = await User.findById({ _id: decoded.payload.id });
        if (!userFind) {
          return NextResponse.json(
            {
              success: false,
              message: "User not found",
            },
            { status: 404 }
          );
        }
        const isCurrentPasswordValid = await comparePassword(
          result.data.currentPassword,
          userFind.password
        );

        if (!isCurrentPasswordValid) {
          return NextResponse.json(
            {
              success: false,
              message: "Current password is incorrect",
            },
            { status: 401 }
          );
        }

        userFind.password = result.data.newPassword;
        await userFind.save();

        return NextResponse.json(
          {
            success: true,
            message: "Password changed successfully",
          },
          { status: 200 }
        );
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          success: false,
          message: "Invalid token",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error processing POST request", error: String(error) },
      { status: 500 }
    );
  }
}
