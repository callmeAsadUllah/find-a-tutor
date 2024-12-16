import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class VerifyAccessTokenMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async use(request: Request, response: Response, next: NextFunction) {
    try {
      const token = request.cookies['accessToken'];

      if (!token) {
        throw new Error('Access Token not found in request');
      }

      const accessTokenSecret = await this.authService.getAccessToken();

      const payload = await this.jwtService.verifyAsync(token, {
        secret: accessTokenSecret,
      });

      request.user = payload;
      next();
    } catch (error) {
      throw new Error(error?.message || 'Invalid access token');
    }
  }
}
