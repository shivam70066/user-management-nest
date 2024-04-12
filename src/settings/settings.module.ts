import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [SettingsController],
  providers: [SettingsService,PrismaClient]
})
export class SettingsModule {}
