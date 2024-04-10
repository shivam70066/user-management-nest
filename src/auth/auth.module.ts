import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaClient } from '@prisma/client';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({ 
      global: true,
      secret: process.env.SECRET_KEY,
    signOptions: { expiresIn: '5D' },
   })],
  providers: [AuthService,PrismaClient,JwtModule],
  controllers: [AuthController]
})
export class AuthModule {
}
