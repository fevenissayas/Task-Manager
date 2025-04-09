ALTER TABLE "tasks" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "tasks" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "tasks" DROP COLUMN "updated_at";