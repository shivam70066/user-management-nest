import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SettingsService {

    constructor(private readonly prisma: PrismaClient,
    ) { }

    async getSettings(){
        const settings = await this.prisma.um_settings.findMany();
        return settings
    }

    async updateRowsPerPage(key:number){

        console.log(key)
        try{
            const isUpdated= await this.prisma.um_settings.update({
                where:{
                    setting_key: "rows_per_page"
                },
                data:{
                    setting_value: key
                }
            })
            if(isUpdated){
                return true
            }
            return false
        }catch(error){
            console.log(error)
        }
    }

}
