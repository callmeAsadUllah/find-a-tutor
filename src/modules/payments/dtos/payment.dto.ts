import { IsNotEmpty, IsString } from 'class-validator';
import { IPayment } from '../interface/payment.interface';

export class PaymentDto implements IPayment {
  @IsNotEmpty()
  @IsString()
  customerId: string;
}
