import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ICustomer } from '../interfaces/customer.interface';
import { Types } from 'mongoose';

export class CreateCustomerDto implements ICustomer {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @IsNotEmpty()
  @IsMongoId()
  userId: Types.ObjectId;
}
