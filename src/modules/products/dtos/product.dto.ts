import { IsString, IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { IProduct } from '../interfaces/product.interface';

export class CreateProductDto implements IProduct {
  @IsNotEmpty()
  @IsMongoId()
  userId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  name: string; // Name of the plan (e.g., Daily, Weekly, Monthly)

  @IsOptional()
  @IsString()
  description?: string; // Description of the plan
}
