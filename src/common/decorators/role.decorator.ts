import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from 'src/common/constants/role.constant';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
