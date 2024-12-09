import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { HashPasswordPipe } from 'src/common/pipes/hash-password/hash-password.pipe';
import { RegisterUserDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { IResponse } from 'src/common/interfaces/response.interface';
import { IUser } from '../users/interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register-as-student')
  @UsePipes(HashPasswordPipe)
  async registerUser(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<IResponse<IUser>> {
    return await this.authService.registerUser(registerUserDto);
  }

  // @Post('register/verify')
  // @UsePipes(HashPasswordPipe)
  // async registerUser(
  //   @Body() registerUserDto: RegisterUserDto,
  // ): Promise<IResponse<IUser>> {
  //   return await this.authService.registerUser(registerUserDto);
  // }
}
