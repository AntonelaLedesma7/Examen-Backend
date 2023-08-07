-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destinations" (
    "id" SERIAL NOT NULL,
    "destination_place" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "estimated_start" TIMESTAMP(3) NOT NULL,
    "estimated_end" TIMESTAMP(3) NOT NULL,
    "estimated_cost" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "destinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saving_plan" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "deposit_period" TEXT NOT NULL,
    "fixed_amount" INTEGER NOT NULL,
    "extra_amount" INTEGER,
    "cumulative_amount" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "saving_plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budgets" (
    "id" SERIAL NOT NULL,
    "destination_id" INTEGER NOT NULL,
    "starting_amount" INTEGER NOT NULL,
    "assigned_saving_amount" INTEGER NOT NULL,
    "current_amount" INTEGER NOT NULL,
    "remaining_amount" INTEGER NOT NULL,
    "priority_level" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "saving_plan_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "budgets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "saving_plan_user_id_key" ON "saving_plan"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "budgets_destination_id_key" ON "budgets"("destination_id");

-- AddForeignKey
ALTER TABLE "destinations" ADD CONSTRAINT "destinations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saving_plan" ADD CONSTRAINT "saving_plan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_saving_plan_id_fkey" FOREIGN KEY ("saving_plan_id") REFERENCES "saving_plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
