import { Controller, Post, Body } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailDto } from './dtos/mail.dto';

@Controller('email')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  async sendMail(@Body() mailDto: MailDto) {
    await this.mailerService.sendMail(mailDto);
  }
}
