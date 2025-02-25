import db from "@/db";
import { Post, User } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const perPage = searchParams.get("perPage") || "10";

  const dbResult = await db
    .select()
    .from(Post)
    .limit(Number(perPage))
    .offset((Number(page) - 1) * Number(perPage));

  return NextResponse.json({ posts: dbResult });
}

export async function POST(req: Request) {
  const { title, content, author_id, published } = await req.json();

  try {
    const usersResult = await db
      .select()
      .from(User)
      .where(eq(User.id, author_id));
    const [user] = usersResult;

    if (!user) {
      throw new Error("User not found");
    }

    const post = await db
      .insert(Post)
      .values({
        title,
        content,
        published: Boolean(published),
        authorId: user.id,
        slug: slugifyText(title),
      })
      .returning()
      .then((e) => e[0]);

    return NextResponse.json({ post });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export const slugifyText = (text: string) => {
  return text.toLowerCase().replace(/ /g, "-");
};
