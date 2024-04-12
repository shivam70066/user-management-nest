import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EmailTemplatesModule } from './email-templates/email-templates.module';
import { MailerModule } from './mailer/mailer.module';
import { SettingsModule } from './settings/settings.module';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
    imports: [AuthModule, UsersModule, EmailTemplatesModule, MailerModule, SettingsModule]
})
export class AdminModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(AuthMiddleware)
          .forRoutes('users','email-templates');
      }
}