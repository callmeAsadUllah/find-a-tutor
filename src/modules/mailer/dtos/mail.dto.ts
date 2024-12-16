import { IsEmail, IsNotEmpty } from 'class-validator';
import { IMail } from '../interfaces/mail.interface';

export class MailDto implements IMail {
  @IsNotEmpty()
  @IsEmail()
  to: string;
}
