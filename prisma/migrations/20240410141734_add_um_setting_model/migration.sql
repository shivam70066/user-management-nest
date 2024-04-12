-- CreateTable
CREATE TABLE "um_settings" (
    "setting_key" TEXT NOT NULL,
    "setting_value" INTEGER NOT NULL,
    "setting_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "setting_update_at" TIMESTAMP(3) NOT NULL,
    "setting_deleted_at" TIMESTAMP(3),

    CONSTRAINT "um_settings_pkey" PRIMARY KEY ("setting_key")
);

-- CreateIndex
CREATE UNIQUE INDEX "um_settings_setting_key_key" ON "um_settings"("setting_key");
