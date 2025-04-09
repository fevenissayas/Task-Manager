ALTER TABLE "tasks" ADD PRIMARY KEY ("user_id");--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" DROP COLUMN "id";