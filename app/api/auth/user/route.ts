import { headers } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/constants/env";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

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
      const decoded = jwt.verify(token, JWT_SECRET);
      await connectDB();
      const userFind = await User.findById(
        (decoded as { id: string }).id
      ).select("-password -createdAt -updatedAt");

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
    return new Response(
      JSON.stringify({ success: false, message: "Error interno" }),
      { status: 500 }
    );
  }
}
