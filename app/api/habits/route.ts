import connectDB from "@/lib/mongodb";
import Area from "@/models/Areas";
import Habit from "@/models/Habits";
import { habitSchema } from "@/schemas/habits";
import { HabitTypes } from "@/types/api/habits";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function GET(req: NextRequest) {
  return NextResponse.json(
    { message: "GET request received" },
    { status: 201 }
  );
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body: HabitTypes = await req.json();

    const result = habitSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Invalid data",
          details: z.flattenError(result.error).fieldErrors,
        },
        { status: 400 }
      );
    }

    if (result.data.areas && result.data.areas.length > 0) {
      const existingAreas = await Area.find({
        _id: { $in: result.data.areas },
      });

      if (existingAreas.length !== result.data.areas.length) {
        return NextResponse.json(
          {
            message: "Some areas do not exist",
            provided: result.data.areas,
            found: existingAreas.map((a) => a._id),
          },
          { status: 400 }
        );
      }
    }

    const habit = new Habit(result.data);

    if (result.data.areas && result.data.areas.length > 0) {
      await Area.updateMany(
        { _id: { $in: result.data.areas } },
        { $addToSet: { habits: habit._id } }
      );
    }

    await habit.save();

    return NextResponse.json(
      { message: "POST request received" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing POST request", error: String(error) },
      { status: 500 }
    );
  }
}
