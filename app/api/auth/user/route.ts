import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { verifyJWT } from "@/utils/jwt";
import { ProfileSchemaActions } from "@/schemas/actions";
import z from "zod";

export async function GET() {
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

    try {
      const decoded = await verifyJWT(token);
      await connectDB();
      const userFind = await User.findById({ _id: decoded.payload.id }).select(
        "-password -createdAt -updatedAt"
      );

      if (!userFind) {
        return NextResponse.json(
          {
            success: false,
            message: "User not found",
          },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { success: true, user: userFind },
        { status: 200 }
      );
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
    const result = ProfileSchemaActions.safeParse(body);
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

      userFind.name = result.data.name;
      await userFind.save();

      return NextResponse.json(
        { success: true, message: "Profile updated successfully" },
        { status: 200 }
      );
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
