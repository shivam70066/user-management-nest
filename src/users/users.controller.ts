import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import {  dataDTO, userDetails } from './users.dto';


@Controller('users')
export class UsersController {

    constructor(
        private userServices: UsersService
    ) { }

    @Get('')
    async getAllUsers(
        @Query('pageIndex') pageIndex: string,
        @Query('pagePerItem') pagePerItem: string,
        @Query('searchTerm') searchTerm: string,
        @Query('sortBy') sortBy: string,
        @Query('sortOrder') sortOrder: 'asc' | 'desc',
        @Res() res: Response
    ) {
        try {
            const index = parseInt(pageIndex, 10) || 0;
            const perItem = parseInt(pagePerItem, 10) || 10;

            const users = await this.userServices.getUsers(index, perItem,
                searchTerm || '',
                sortBy || 'user_created_at',
                sortOrder || 'asc');

            const countUsers = await this.userServices.countUsers(index, perItem,
                searchTerm || '',
                sortBy || 'user_created_at',
                sortOrder || 'asc');



            return res.status(200).json({
                status: 200,
                data: users,
                count: countUsers
            });
        } catch (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    @Get(':id')
    async getUser(@Param('id') id: string, @Res() res: Response) {
        try {
            const userId: number = Number(id);
            const data = await this.userServices.getUser(userId);
            if (!data) {
                return res.status(404).json({ msg: "User not found" });
            }
            return res.status(200).json({ msg: 'User Found', data: data });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string, @Res() res: Response) {
        try {
            const isDeleted = await this.userServices.deleteUser(Number(id));
            if (isDeleted) {
                return res.status(200).json({ status: 200, msg: 'Deleted' });
            } else {
                return res.status(404).json({ status: 404, msg: 'User Not found' });
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    @Put(':id')
    async updateUser(@Body() body: dataDTO, @Param('id') id: string, @Res() res: Response) {
        console.log(body)

        const isEmailExist = await this.userServices.isEmailExist(body.email, body.name, Number(id));
        console.log(isEmailExist)

        if (isEmailExist) {
            return res.status(409).json({
                msg: "Email already exist"
            })
        }

        const isUpdated = await this.userServices.updateUser(body,Number(id));
        if(isUpdated)  return res.status(200).json({ status:200,msg:"User details updated ",data: "data" })

        return res.status(400).json({ msg: "Error in update" })
    }

    @Post('')
    async addUser(@Body() body: userDetails, @Res() res: Response){
        
        try{

            const isEmailExist = await this.userServices.isEmailregistered(body.email);
            if(isEmailExist){
                return res.status(403).json({status:403,msg:"Email already registered"})
            }
            
            const roleID = await this.userServices.findRoleIDBySlug(body.role_slug);
            
            const userAdded = await this.userServices.addUser(body, roleID);

            console.log(userAdded)
            
            if(userAdded)
                return res.status(200).json({status: 200, msg: "User Created Successfully." })
        }
        catch (error) {
            console.error("Error creating user:", error);
            return res.status(500).json({ status: 500, msg: "Internal Server Error" });
        }

    }
}

