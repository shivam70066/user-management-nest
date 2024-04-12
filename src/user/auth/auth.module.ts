import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [AuthController],
  providers: [AuthService,PrismaClient,JwtModule],
  imports: [
    JwtModule.register({ 
      global: true,
      secret: process.env.SECRET_KEY,
    signOptions: { expiresIn: '5D' },
   })],
})
export class AuthModule {}
