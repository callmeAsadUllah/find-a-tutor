import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  OnModuleInit,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { TwilioService } from '../twilio/twilio.service';
import {
  EmailDto,
  PhoneNumberDto,
  VerifyEmailCodeDto,
  VerifyPhoneNumberCodeDto,
} from '../auth/dtos/auth.dto';
import { ConnectDto } from './dtos/connect.dto';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/role.decorator';
import { MailerService } from '../mailer/mailer.service';
import { City } from 'src/common/enums/city.enum';
import { PaymentsService } from '../payments/payments.service';
import { CreateProductDto } from '../products/dtos/product.dto';
import { Request } from 'express';
import { CreatePriceDto } from '../prices/dtos/price.dto';
import { CreateCustomerDto } from '../customers/dtos/customer.dto';
import { CreateSubscriptionDto } from '../subscriptions/dtos/subscription.dto';

@Controller('users')
export class UsersController implements OnModuleInit {
  constructor(
    @Inject(forwardRef(() => TwilioService))
    private readonly twilioService: TwilioService,
    @Inject(forwardRef(() => MailerService))
    private readonly mailerService: MailerService,
    private readonly usersService: UsersService,
    private readonly paymentsService: PaymentsService,
  ) {}

  onModuleInit() {
    console.log('UsersController initialized');
  }

  @Post('phone-number/send-code')
  async sendPhoneNumberVerificationCode(
    @Body() phoneNumberDto: PhoneNumberDto,
  ) {
    return await this.twilioService.sendPhoneNumberVerificationCode(
      phoneNumberDto,
    );
  }

  @Post('email/send-code')
  async sendEmailVerificationCode(@Body() emailDto: EmailDto) {
    return await this.mailerService.sendEmailVerificationCode(emailDto);
  }

  @Post('email/verify-code')
  async verifyEmailCode(@Body() verifyEmailCodeDto: VerifyEmailCodeDto) {
    return await this.mailerService.verifyEmailCode(verifyEmailCodeDto);
  }

  @Post('phone-number/verify-code')
  async verifyPhoneNumberCode(
    @Body() verifyPhoneNumberCodeDto: VerifyPhoneNumberCodeDto,
  ) {
    return await this.twilioService.verifyPhoneNumberCode(
      verifyPhoneNumberCodeDto,
    );
  }

  @Get('tutors')
  @Roles(Role.STUDENT)
  async findAllTutors(
    @Query('city') city?: City,
    @Query('role') role: Role = Role.TUTOR,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.usersService.findAllUsers(city, role, page, limit);
  }

  @Post('connect')
  @Roles(Role.STUDENT)
  async connectUser(@Body() connectDto: ConnectDto) {
    return this.usersService.connectUser(connectDto);
  }

  @Post('products')
  async createStripeProduct(
    @Req() request: Request,
    @Body() createProductDto: CreateProductDto,
  ) {
    const { role } = request.user;

    if (role !== Role.TUTOR) {
      throw new Error('Only tutors can create prices');
    }

    try {
      const product =
        await this.paymentsService.createStripeProduct(createProductDto);
      console.log(product);
      return product;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  @Post('prices')
  async createStripePrice(
    @Req() request: Request,
    @Body() createPriceDto: CreatePriceDto,
  ) {
    const { role } = request.user;

    if (role !== Role.TUTOR) {
      throw new Error('Only tutors can create prices');
    }

    try {
      const price =
        await this.paymentsService.createStripePrice(createPriceDto);
      console.log(price);
      return price;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  @Post('customers')
  async createStripeCustomer(
    @Req() request: Request,
    @Body() createCustomerDto: CreateCustomerDto,
  ) {
    const { role } = request.user;

    if (role !== Role.STUDENT) {
      throw new Error('Only students can created in customer');
    }

    try {
      const customer =
        await this.paymentsService.createStripeCustomer(createCustomerDto);
      console.log(customer);
      return customer;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  @Post('subscriptions')
  async createStripeSubscriptions(
    @Req() request: Request,
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    const { role } = request.user;

    if (role !== Role.STUDENT) {
      throw new Error('Only students can create or make subscriptions');
    }

    try {
      const subscription = await this.paymentsService.createStripeSubscription(
        createSubscriptionDto,
      );
      console.log(subscription);
      return subscription;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
}
