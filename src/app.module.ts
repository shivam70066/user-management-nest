import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';

import { AuthMiddleware } from './middlewares/auth.middleware'
import { UserModule } from './user/user.module';
import { RouterModule } from '@nestjs/core';
import path from 'path';
import { AuthModule } from './user/auth/auth.module';
import { UserController } from './user/user.controller';
@Module({
  imports: [
    AdminModule,
    UserModule,
    RouterModule.register([
      {
        path: 'user',
        module: UserModule,
        children: [
          {
            path: "auth",
            module: AuthModule
          }
        ]
      }
    ])

  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('users', 'email-templates');
  }
}
