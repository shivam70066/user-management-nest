import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { chownSync } from 'fs';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            (req as any).token = token;
            try {
                const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
                
            } catch (error) {
                throw new UnauthorizedException('Invalid token');

            }
        } else {
            throw new UnauthorizedException('Authorization header missing or invalid');
        }

        next();
    }
}
