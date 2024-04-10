import { Module } from '@nestjs/common';
import { EmailTemplatesService } from './email-templates.service';
import { EmailTemplatesController } from './email-templates.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [EmailTemplatesService,PrismaClient],
  controllers: [EmailTemplatesController]
})
export class EmailTemplatesModule {}
