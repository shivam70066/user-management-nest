import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { constants } from 'buffer';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {

  constructor(private readonly prisma: PrismaClient){}


  mailTransport() {

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 465,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    return transporter;
  }


  async sendEmail(data: any) {


    const { from, recipent, subject, html } = data;
    const transport = this.mailTransport();
    const options: Mail.Options = {
      from: from ?? {
        name: process.env.APP_NAME,
        address: process.env.DEFAULT_MAIL_FROM
      },
      to: recipent,
      subject,
      html

    }
    try {

      const result = await transport.sendMail(options);
      return result;

    } catch (error) {
      console.log(error)
    }
  }


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
}
