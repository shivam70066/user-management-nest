import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import {AuthMiddleware} from './middlewares/auth.middleware'
import { EmailTemplatesModule } from './email-templates/email-templates.module';

@Module({
  imports: [AuthModule, UsersModule, EmailTemplatesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('users','email-templates');
  }
}
