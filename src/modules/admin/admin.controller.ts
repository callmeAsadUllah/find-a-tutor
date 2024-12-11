import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { IResponse } from 'src/common/interfaces/response.interface';
import { IUser } from '../users/interfaces/user.interface';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/role.decorator';

@Controller('admin')
@Roles(Role.ADMIN)
export class AdminController implements OnModuleInit {
  constructor(private readonly usersService: UsersService) {}

  onModuleInit() {
    console.log('AdminController initialized');
  }

  @Get('users')
  async findALlUsers(): Promise<Partial<IResponse<IUser[] | null>>> {
    try {
      return await this.usersService.findAllUsers();
    } catch (error) {
      console.error('Error in users:', error.message);
      throw new HttpException(
        'Unable to retrieve users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @Post('accounts/verify')
  // async verifyAccount(@Body() body: { Id: string; role: string }) {
  //   console.log('Request received:', body);
  //   const { Id, role } = body;
  //   const result = await this.adminService.verifyAccount(Id, role);
  //   return result;
  // }
}
