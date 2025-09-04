import connectDB from "@/lib/mongodb";
import Area from "@/models/Areas";
import { areaSchema } from "@/schemas/areas";
import { AreaTypes } from "@/types/api/areas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function GET() {
  try {
    await connectDB();

    const areas = await Area.find({});

    return NextResponse.json(
      { success: true, data: areas },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing POST request", error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body: AreaTypes = await req.json();

    const result = areaSchema.safeParse(body);
    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors;
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input data",
          rrors: fieldErrors,
        },
        { status: 400 }
      );
    }

    const existingArea = await Area.findOne({ name: result.data.name });
    if (existingArea) {
      return NextResponse.json(
        {
          success: false,
          message: "Area with this name already exists",
        },
        { status: 409 }
      );
    }

    const area = new Area(result.data);
    await area.save();

    return NextResponse.json(
      { success: true, message: "Area created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing POST request", error: String(error) },
      { status: 500 }
    );
  }
}
