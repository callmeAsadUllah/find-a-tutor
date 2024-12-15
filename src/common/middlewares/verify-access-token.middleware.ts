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
      const token = request.cookies?.accessToken;
      // optional
      console.log(token, 'Token from cookies');

      if (!token) {
        throw new Error('Access Token not found in request');
      }

      const accessTokenSecret = await this.authService.getAccessToken();

      const payload = (await this.jwtService.verifyAsync(token, {
        secret: accessTokenSecret,
      })) as { userId: number };

      console.log(payload, 'Token');

      request['userId'] = payload.userId;

      next();
    } catch (error) {
      throw new Error(error?.message || 'Invalid access token');
    }
  }
}
