import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { HashPasswordPipe } from 'src/common/pipes/hash-password/hash-password.pipe';
import { LoginDto, RegisterDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { IResponse } from 'src/common/interfaces/response.interface';
import { IUser } from '../users/interfaces/user.interface';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(HashPasswordPipe)
  async registerUser(
    @Body() registerDto: RegisterDto,
  ): Promise<Partial<IResponse<IUser>>> {
    return await this.authService.registerUser(registerDto);
  }

  @Post('login')
  async loginUser(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Partial<IResponse<IUser>>> {
    try {
      const user = await this.authService.loginUser(loginDto);

      const cookieOptions = {
        httpOnly: true,
      };

      response.cookie('accessToken', user.accessToken, cookieOptions);
      response.cookie('refreshToken', user.refreshToken, cookieOptions);

      return {
        statusCode: HttpStatus.OK,
        message: 'Login successful',
        data: null,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      };
    } catch {
      response.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Invalid credentials or login error',
      });
    }
  }
}
