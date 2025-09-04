import Habit from "@/models/Habits";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const data = await Habit.findById(id).populate({
    path: "areas",
    select: '_id name',
  });

  return NextResponse.json(
    { message: "GET request received by ID", data },
    { status: 201 }
  );
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  return NextResponse.json(
    { message: "PUT request received by ID", id },
    { status: 201 }
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  return NextResponse.json(
    { message: "DELETE request received by ID", id },
    { status: 201 }
  );
}
