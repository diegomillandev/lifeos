import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    return NextResponse.json(
      { message: "GET request received by ID", id },
      { status: 201 }
    );
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    return NextResponse.json(
      { message: "PUT request received by ID", id },
      { status: 201 }
    );
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    return NextResponse.json(
      { message: "DELETE request received by ID", id },
      { status: 201 }
    );
}

