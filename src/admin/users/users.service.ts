import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { PrismaClient, RoleSlug } from '@prisma/client';
import { dataDTO, userDetails } from './users.dto';

@Injectable()
export class UsersService {

    constructor(private readonly prisma: PrismaClient,
    ) { }

    async getUser(id: number) {
        const user = await this.prisma.um_users.findFirst({
            where: {
                user_id: id,
            }
        })
        return user;
    }


    async getUsers(pageIndex: number,
        pagePerItem: number,
        searchTerm: string,
        sortBy: string,
        sortOrder: string
    ) {
        const start = pageIndex * pagePerItem;
        const orderBy: any = sortBy=="user_role"?{
            um_roles:{
                role_name: sortOrder
            }
        }:{
            [sortBy]: sortOrder
        }
        const user = await this.prisma.um_users.findMany({
            include: {
                um_roles: true 
              },
            where: {
                NOT: {
                    user_role_id: 13
                },
                user_deleted_at: null,

                OR: [
                    { user_name: { contains: searchTerm, mode: 'insensitive' } },
                    { user_email: { contains: searchTerm, mode: 'insensitive' } },
                    { user_number: { contains: searchTerm, mode: 'insensitive' } },
                    { user_gender: { contains: searchTerm, mode: 'insensitive' } },
                    { um_roles: { role_name: { contains: searchTerm , mode: 'insensitive' } } }
                ],
            },

            orderBy,
            skip: start,
            take: pagePerItem,
        })
        return user;
    }


    async countUsers(pageIndex: number,
        pagePerItem: number,
        searchTerm: string,
        sortBy: string,
        sortOrder: string
    ) {
        const totalUsers = await this.prisma.um_users.count({
            where: {
                NOT: {
                    user_role_id: 13
                },
                user_deleted_at: null,
                OR: [
                    { user_name: { contains: searchTerm, mode: 'insensitive' } },
                    { user_email: { contains: searchTerm, mode: 'insensitive' } },
                    { user_number: { contains: searchTerm, mode: 'insensitive' } },
                    { user_gender: { contains: searchTerm, mode: 'insensitive' } },
                    { um_roles: { role_name: { contains: searchTerm , mode: 'insensitive' } } }
                ],
            }
        });
        return totalUsers;
    }


    async deleteUser(id: number) {

        const isUserExist = await this.prisma.um_users.findFirst({
            where: {
                user_id: id,
                user_deleted_at: null

            }
        });
        if (!isUserExist) { return false }

        const users = await this.prisma.um_users.update({
            where: {
                user_id: id
            },
            data: {
                user_deleted_at: new Date()
            }
        });
        return true;
    }

    async isEmailExist(email: string, name: string, id: number) {
        const isEmailFound = await this.prisma.um_users.findFirst({
            where: {
                user_email: {
                    equals: email,
                    mode: 'insensitive',
                },
                NOT: {
                    user_id: id
                }
            }
        });
        if (isEmailFound == null) return false

        return true
    }

    async updateUser(body: dataDTO, id: number) {
        const isUpdated = await this.prisma.um_users.update({
            where: {
                user_id: id
            },
            data: {
                user_name: body.name,
                user_email: body.email,
                user_gender: body.gender,
                user_number: String(body.number),
                user_role_id: body.roleID
            }
        })

        if (isUpdated == null) return false;

        return true;
    }

    async isEmailregistered(email: string) {
        const isRegistered = await this.prisma.um_users.findFirst({
            where: {
                user_email: {
                    equals: email,
                    mode: 'insensitive',
                },
            }
        })
        if (isRegistered == null) return false

        return true;
    }

    async findRoleIDBySlug(roleSlug: RoleSlug) {
        const roleDetails = await this.prisma.um_roles.findFirst({
            where: {
                role_slug: roleSlug
            }
        })
        return roleDetails.role_id
    }

    async addUser(userData: userDetails, roleID: number) {
        const password = await bcrypt.hash(userData.password, 10);
        const created = await this.prisma.um_users.create({
            data: {
                user_name: userData.name,
                user_email: userData.email,
                user_password: password,
                user_gender: userData.gender,
                user_number: String(userData.number),
                user_role_id: roleID
            }
        })
        if (created) return true

        return false
    }

    async changePassword(oldPassword:string, newPassword:string,id:number ){
        const userHashPassword = await this.prisma.um_users.findFirst({
            where:{
                user_id: id
            },
            select:{
                user_password:true
            }
        })

        const isPasswordTrue = await bcrypt.compare(oldPassword, userHashPassword.user_password);

        if(isPasswordTrue){
            const updatePassword = await bcrypt.hash(newPassword, 10);
            await this.prisma.um_users.update({
                where:{
                    user_id:id
                },data:{
                    user_password: updatePassword
                }
            })
            return true
        }
        return false;

    }


}
