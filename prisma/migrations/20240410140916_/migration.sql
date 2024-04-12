-- CreateEnum
CREATE TYPE "RoleSlug" AS ENUM ('super_admin', 'admin', 'manager', 'team_lead', 'employee');

-- CreateTable
CREATE TABLE "um_users" (
    "user_id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_gender" TEXT NOT NULL,
    "user_number" TEXT NOT NULL,
    "user_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_deleted_at" TIMESTAMP(3),
    "user_role_id" INTEGER,

    CONSTRAINT "um_users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "um_roles" (
    "role_id" SERIAL NOT NULL,
    "role_name" TEXT NOT NULL,
    "role_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role_updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role_deleted_at" TIMESTAMP(3),
    "role_slug" "RoleSlug" NOT NULL,

    CONSTRAINT "um_roles_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "um_email_templates" (
    "et_id" SERIAL NOT NULL,
    "et_name" TEXT NOT NULL,
    "et_slug" TEXT NOT NULL,
    "et_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "et_updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "et_deleted_at" TIMESTAMP(3),
    "et_data" TEXT NOT NULL,
    "et_subject" TEXT NOT NULL,

    CONSTRAINT "um_email_templates_pkey" PRIMARY KEY ("et_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "um_users_user_email_key" ON "um_users"("user_email");

-- CreateIndex
CREATE INDEX "um_users_user_id_idx" ON "um_users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "um_roles_role_id_key" ON "um_roles"("role_id");

-- CreateIndex
CREATE UNIQUE INDEX "um_roles_role_slug_key" ON "um_roles"("role_slug");

-- CreateIndex
CREATE INDEX "um_roles_role_id_idx" ON "um_roles"("role_id");

-- CreateIndex
CREATE UNIQUE INDEX "um_email_templates_et_id_key" ON "um_email_templates"("et_id");

-- CreateIndex
CREATE UNIQUE INDEX "um_email_templates_et_slug_key" ON "um_email_templates"("et_slug");

-- AddForeignKey
ALTER TABLE "um_users" ADD CONSTRAINT "um_users_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "um_roles"("role_id") ON DELETE SET NULL ON UPDATE CASCADE;
