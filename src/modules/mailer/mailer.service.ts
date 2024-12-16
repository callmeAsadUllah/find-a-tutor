import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';
import { MailDto } from './dtos/mail.dto';

@Injectable()
export class MailerService {
  private transporter: Transporter;
  private readonly verificationStore: Map<string, string>;

  constructor(private readonly configService: ConfigService) {
    this.transporter = createTransport({
      service: this.getSMTPService(),
      host: this.getSMTPHost(),
      port: this.getSMTPPort(),
      secure: this.getSMTPSecure(),
      auth: {
        user: this.getSMTPAuthUser(),
        pass: this.getSMTPAuthPass(),
      },
    });
    this.verificationStore = new Map<string, string>();
  }

  getSMTPService() {
    return this.configService.get<string>('SMTP_SERVICE');
  }

  getSMTPHost() {
    return this.configService.get<string>('SMTP_HOST');
  }

  getSMTPPort() {
    return this.configService.get<number>('SMTP_PORT');
  }

  getSMTPSecure() {
    return this.configService.get<boolean>('SMTP_SECURE');
  }

  getSMTPAuthUser() {
    return this.configService.get<string>('SMTP_USER');
  }

  getSMTPAuthPass() {
    return this.configService.get<string>('SMTP_PASS');
  }

  async sendMail(mailDto: MailDto) {
    const mailOptions = {
      from: 'find A Tutor <admin@fat.io>',
      to: mailDto.to,
      subject: 'New Connection Request from a Student',
      text: `Hello, You have a new connection request from a student!`,
      html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f7fa;
            color: #333;
            padding: 20px;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .email-header {
            background-color: #4CAF50;
            color: white;
            padding: 10px 0;
            text-align: center;
            border-radius: 5px;
          }
          .email-header h1 {
            margin: 0;
            font-size: 24px;
          }
          .email-body {
            margin-top: 20px;
          }
          .email-body p {
            font-size: 16px;
            line-height: 1.6;
          }
          .student-info {
            background-color: #f1f1f1;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
          }
          .student-info p {
            margin: 8px 0;
            font-weight: bold;
          }
          .footer {
            margin-top: 30px;
            font-size: 12px;
            text-align: center;
            color: #999;
          }
          .button {
            display: inline-block;
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            font-size: 16px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h1>New Connection Request</h1>
          </div>
          <div class="email-body">
            <p>Dear Tutor,</p>
            <p>You have received a connection request from a student! Please find their details below:</p>

            

            <p>The student is interested in connecting with you and potentially becoming one of your students. To accept or reject the request, please click the button below.</p>

            
            <a href="/" class="button">View Request</a>
          </div>
          
          <div class="footer">
            <p>Find A Tutor Team</p>
            <p>If you did not request this, please ignore this email.</p>
          </div>
        </div>
      </body>
    </html>
  `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.info(info);
    } catch {
      throw new Error();
    }
  }
}

// <!-- <a href="${mailDto.connectionRequestLink}" class="button">View Request</a>-->
// <div class="student-info">
//               <p><strong>Student Name:</strong> ${mailDto.firstMame} ${mailDto.lastName}</p>
//               <p><strong>Email:</strong> ${mailDto.email}</p>
//             </div>
