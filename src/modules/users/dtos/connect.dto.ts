import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { Connect } from 'src/common/enums/connect.enum';

export class ConnectDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: Types.ObjectId;

  @IsNotEmpty()
  @IsEnum(Connect)
  connect: Connect;
}
