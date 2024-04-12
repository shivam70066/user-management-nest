import { Injectable, Body } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TemplateBody } from 'src/admin/auth/interfaces/interfaces';

@Injectable()
export class EmailTemplatesService {

    constructor(private readonly prisma: PrismaClient,
    ) { }

    async getTemplate(slug: string) {

        const templateData = await this.prisma.um_email_templates.findFirst({
            where: {
                et_slug: slug
            }
        })

        if (templateData == null)
            return null

        return templateData;
    }

    async getTemplates(){
        const templatesData = await this.prisma.um_email_templates.findMany({
            orderBy: {
                et_name: 'asc', 
            }})

        if(templatesData==null){
            return null
        }

        return templatesData
    }

    async updateTemplate(body: TemplateBody, slug:string){

        const isUpdated = await this.prisma.um_email_templates.update({
            where:{
                et_slug: slug
            }, data:{
                et_subject: body.subject,
                et_data: body.body
            }
        })
        if(isUpdated==null){
            return false
        }
        return true
    }




}
