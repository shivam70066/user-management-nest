import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { Response } from 'express';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService,
  ) {}
  
  @Post(':template_slug')
  async sendMail(@Body() body: any, @Res() res: Response,@Param('template_slug') slug: string){


    const templateData= await this.mailerService.getTemplate(slug)

    
    templateData.et_data = templateData.et_data.replace('{{name}}', body.name);
    templateData.et_data = templateData.et_data.replace('{{password}}', body.password);
    templateData.et_data = templateData.et_data.replace('{{email}}', body.email);

    const data = {
      from:{ name:process.env.APP_NAME, address: process.env.DEFAULT_MAIL_FROM},
      recipent : {name:body.name, address: body.email},
      subject: templateData.et_subject,
      html: templateData.et_data
    }

    this.mailerService.sendEmail(data);
    return res.status(200).json({data})
  }
}
