CREATE TABLE "users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tasks" DROP COLUMN "email";--> statement-breakpoint
ALTER TABLE "tasks" DROP COLUMN "name";