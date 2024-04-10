import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {

    constructor(private readonly prisma: PrismaClient,
    ) { }

    async isCredentialsTrue(email: string, password: string) {

        const isValidUser = await this.prisma.um_users.findFirst({
            where: {
                user_email: {
                    equals: email,
                    mode: 'insensitive',
                },
            },
            select: {
                user_name: true,
                user_password: true,
                um_roles: {
                    select: {
                        role_slug: true,
                    },
                },
            }
        })

        let isPasswordValid;
        if (isValidUser) {
            isPasswordValid = await bcrypt.compare(password, isValidUser.user_password);
        }

        if (isPasswordValid) {
            return {
                name: isValidUser.user_name,
                role_slug: isValidUser.um_roles.role_slug
            }
        }
        return false;
    }


    async isEmailAlreadyRegistered(email: string): Promise<boolean> {
        const isRegistered = await this.prisma.um_users.findFirst({
            where: {
                user_email: {
                    equals: email,
                    mode: 'insensitive',
                },
            }
        })
        if (isRegistered) {
            return true
        }

        return false;
    }

    async createNewUser(name: string, email: string, password: string, gender: string, number: string, empID: number): Promise<boolean> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const isCreated = await this.prisma.um_users.create({
            data: {
                user_name: name,
                user_email: email.toLowerCase(),
                user_password: hashedPassword,
                user_gender: gender,
                user_number: number,
                user_role_id: empID
            }
        });
        if (isCreated) {
            return true
        }
        return false
    }


    async getEmpID(){
    const empID = await this.prisma.um_roles.findFirst({
        where: {
            role_slug: "employee"
        },
        select: {
            role_id: true
        }
    })
    return empID.role_id
}

}
