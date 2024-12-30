import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from '../enums/role.enum';

@Injectable()
export class VerifyAdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      throw new UnauthorizedException('Admin not authenticated');
    }

    if (request.user.role !== Role.ADMIN) {
      throw new ForbiddenException('Access restricted to admins');
    }

    return true;
  }
}
