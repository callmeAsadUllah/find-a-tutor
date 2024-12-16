import { IsMongoId, IsNotEmpty } from 'class-validator';

export class AccountDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;
}
