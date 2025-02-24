import db from "@/db";
import { CreateUserArgs, User } from "@/db/schemas";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const age = searchParams.get("age") || "18";

  try {
    if (!name) {
      throw new Error("Name is required");
    }

    const username = formatUsernameFromName(name);

    const values: CreateUserArgs = {
      name,
      email: `${username}@example.com`,
      password: "password",
      age: Number(age),
    };
    const user = await db.insert(User).values(values);
    return NextResponse.json({ user });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export const formatUsernameFromName = (name: string) => {
  return name.toLowerCase().split(" ").join("_");
};
