CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"content" text,
	"published" boolean DEFAULT false NOT NULL,
	"author_id" uuid NOT NULL,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
