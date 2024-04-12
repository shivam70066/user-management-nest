import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [MailerService,PrismaClient],
  controllers: [MailerController],
})
export class MailerModule {}
