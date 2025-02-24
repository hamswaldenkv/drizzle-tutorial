CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"name" varchar NOT NULL,
	"age" integer DEFAULT 18 NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
