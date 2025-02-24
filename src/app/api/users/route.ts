import db from "@/db";
import { User } from "@/db/schemas";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const perPage = searchParams.get("perPage") || "3";

  try {
    const dbResult = await db
      .select()
      .from(User)
      .limit(Number(perPage))
      .offset((Number(page) - 1) * Number(perPage));

    return NextResponse.json({ dbResult });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
