import db from "@/db";
import { User } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  try {
    const dbResult = await db.select().from(User).where(eq(User.id, id));
    const [firstResult] = dbResult;

    if (!firstResult) {
      throw new Error("User not found");
    }

    return NextResponse.json({ firstResult });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
