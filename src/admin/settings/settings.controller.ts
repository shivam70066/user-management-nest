import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { Response } from 'express';

@Controller('settings')
export class SettingsController {

    constructor(
        private readonly service: SettingsService,
    ) { }

    @Get('')
    async getSettings(@Res() res: Response){
        try{
            const settingsData =  await this.service.getSettings();
            if(settingsData!=null){
                return res.status(200).json({data:settingsData})
            }
            else{
                return res.status(400).json({msg: "Not Found"})
            }
        }catch{
            return res.status(500).json({msg: "Error in server"})
        }
    }
    
    @Post('/rowsPerPage')
    async getRowsPerPage(@Res() res: Response,@Body() body:any){ 
        
        try{
            const key = body.rowsPerPage;
            const isUpdated =  await this.service.updateRowsPerPage(key);
            if(isUpdated){
                return res.status(200).json({msg:"Settings Updated"})
            }
            else{
                return res.status(404).json({msg:"error in update"})
            }
        }catch{
            return res.status(500).json({msg: "Error in server"})
        }
    }
}
