import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDTO, signUpDTO } from './DTO/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/interfaces';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly service: AuthService,
        private readonly jwtService: JwtService,
    ) { }

    @Get('/me')
    async decodeToken(@Req() req: Request, @Res() res: Response) {
        const header = req.headers;
        const auth = header['authorization']
        const token = auth.substring(7);
        try {
            const decoded = this.jwtService.decode(token);
            return res.json({ data: decoded })
        } catch (error) {
            throw new Error('Token decoding failed');
        }
    }

    @Post('/login')
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

                console.log(payload)
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
    @UsePipes(ValidationPipe)
    async signup(@Body() body: signUpDTO, @Res() res: Response) {
        try {
            if (await this.service.isEmailAlreadyRegistered(body.email)) {
                return res.json({ status: 403, msg: "Email already registered." });
            }

            const empID: number = await this.service.getEmpID();
            const isUserCreated: boolean = await this.service.createNewUser(
                body.name,
                body.email,
                body.password,
                body.gender,
                body.number,
                empID,
            );

            if (isUserCreated) {
                return res.json({ status: 200, msg: "User Created Successfully." });
            } else {
                return res.json({ status: 400, msg: "Error in creating user." });
            }
        } catch (error) {
            console.error('Signup error:', error);
            return res.status(500).json({ status: 500, msg: "Internal Server Error" });
        }
    }







}

