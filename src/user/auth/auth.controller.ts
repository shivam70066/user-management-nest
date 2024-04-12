import { Body, Controller, Get, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO, signUpDTO } from 'src/admin/auth/DTO/auth.dto';
import { Response } from 'express';
import { TokenPayload } from 'src/admin/auth/interfaces/interfaces';

@Controller()
export class AuthController {
    constructor(
        private readonly service: AuthService,
        private readonly jwtService: JwtService,
    ) { }

    @Post('login')
    @UsePipes(ValidationPipe)
    async login(@Body() body: LoginDTO, @Res() res: Response) {
        try {
            const { password, email } = body;
            const isValidUser = await this.service.isCredentialsTrue(email, password);

            if (isValidUser) {
                const payload: TokenPayload = {
                    email: isValidUser.email,
                    id: isValidUser.id,
                    name: isValidUser.name,
                    role_slug: isValidUser.role_slug,
                };
                const token = await this.jwtService.signAsync(payload);

                return res.status(200).json({ status: 200, msg: "Login Successfully", token: token });
            } else {
                return res.status(401).json({ status: 401, msg: "Wrong Credentials" });
            }
        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({ status: 500, msg: "Internal Server Error" });
        }
    }
    @Post('signup')
    // @UsePipes(ValidationPipe)
    async signup(@Body() body: signUpDTO, @Res() res: Response) {
        console.log(body)
        try {
            if (await this.service.isEmailAlreadyRegistered(body.email)) {
                return res.status(403).json({ status: 403, msg: "Email already registered." });
            }

            const empID: number = await this.service.getEmpID();
            const isUserCreated: boolean = await this.service.createNewUser(
                body.name,
                body.email,
                body.password,
                body.gender,
                String(body.number),
                empID,
            );

            if (isUserCreated) {
                return res.status(200).json({ status: 200, msg: "User Created Successfully." });
            } else {
                return res.status(400).json({ status: 400, msg: "Error in creating user." });
            }
        } catch (error) {
            console.error('Signup error:', error);
            return res.status(500).json({ status: 500, msg: "Internal Server Error" });
        }
    }
}
