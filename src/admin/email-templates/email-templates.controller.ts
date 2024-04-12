import { EmailTemplatesService } from './email-templates.service';
import { Body, Controller, Get, Inject, Param, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { TemplateBody } from 'src/admin/auth/interfaces/interfaces';

@Controller('email-templates')
export class EmailTemplatesController {

    constructor(private readonly emailServices: EmailTemplatesService) { }

    @Get('')
    async getTemplates(@Res() res: Response){
        try{
            const templatesData = await this.emailServices.getTemplates();
            if (templatesData==null){
                return res.status(404).json({ msg: "No data found" })
            }
            return res.status(200).json({ msg: "Successfully Found", data: templatesData })

        } catch(error){
            return res.status(500).json({msg: error})
        }
    }

    @Get(":slug")
    async getTemplate(@Param('slug') slug: string, @Res() res: Response) {

        try {
            const templateData = await this.emailServices.getTemplate(slug)
            if (templateData == null) {
                return res.status(404).json({ msg: "No data found" })
            }

            return res.status(200).json({ msg: "Successfully Found", data: templateData })
        } catch (error) {
            return res.status(500).json({msg: error})
        }
    }

    @Put(":slug")
    async updateTemplate(@Body() body: TemplateBody, @Res() res: Response,@Param('slug') slug: string){
        try{
            const isUpdated = await this.emailServices.updateTemplate(body,slug);

            if(isUpdated){
                return res.status(200).json({msg: "Succesfully updated."})
            }
            return res.status(400).json({msg:"Error in updating"})
        }
        catch(error){
            return res.status(500).json({msg: error})

        }
    }
}
