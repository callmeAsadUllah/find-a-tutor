import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { HashPasswordPipe } from 'src/common/pipes/hash-password/hash-password.pipe';
import { LoginDto, RegisterDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { IUser } from '../users/interfaces/user.interface';
import { Response, Request } from 'express';
import { RefreshTokenPipe } from 'src/common/pipes/refresh-token/refresh-token.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(HashPasswordPipe)
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const user = await this.authService.login(loginDto);

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

  @Get('refresh-token')
  @UsePipes(RefreshTokenPipe)
  public async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshTokenFromCookie = request.cookies['refreshToken'];

    const refreshedToken = await this.authService.refreshToken(
      refreshTokenFromCookie,
    );

    const Options = {
      httpOnly: true,
      secure: true,
    };

    response.cookie('accessToken', refreshedToken.accessToken, Options);
    response.cookie('refreshToken', refreshedToken.refreshToken, Options);

    return {
      accessToken: refreshedToken.accessToken,
      refreshToken: refreshedToken.refreshToken,
    };
  }

  @Post('logout')
  async logout(
    @Body() { userId }: { userId: string },
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ user: IUser }> {
    const responseFromAuthService = await this.authService.logout(userId);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };

    if (responseFromAuthService) {
      {
        response.clearCookie('accessToken', cookieOptions);
        response.clearCookie('refreshToken', cookieOptions);
      }
      return responseFromAuthService;
    }
  }
}
