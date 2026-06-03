-- CreateEnum
CREATE TYPE "TaskCategory" AS ENUM ('work', 'personal', 'shopping', 'other');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('pending', 'inProgress', 'completed');

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" "TaskCategory" NOT NULL,
    "status" "TaskStatus" NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
