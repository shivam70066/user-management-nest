import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@nestjs/core';

@Module({
    imports: [AuthModule, 
    //     RouterModule.register([
    //     {
    //         path: "auth",
    //         module: AuthModule
    //     }
    // ])
    ],
    controllers: [UserController],

})
export class UserModule { }
