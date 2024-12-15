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
import { AccountActivationRequestDto, RequestDto } from './dtos/admin.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController implements OnModuleInit {
  constructor(
    private readonly adminService: AdminService,
    private readonly usersService: UsersService,
  ) {}

  onModuleInit() {
    console.log('AdminController initialized');
  }

  @Get('users')
  async findAllUsers(): Promise<Partial<IResponse<IUser[]>>> {
    try {
      return await this.usersService.findAllUsers();
    } catch {
      throw new HttpException(
        'Unable to retrieve users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('accounts/requests')
  findAllAVerificationRequests() {
    return this.adminService.findAllAVerificationRequests();
  }

  @Post('accounts/requests')
  sendAccountActivationRequest(
    @Body() accountActivationRequestDto: AccountActivationRequestDto,
  ) {
    return this.adminService.sendAccountActivationRequest(
      accountActivationRequestDto,
    );
  }

  @Post('accounts/requests/approve')
  async approveAccountActivationRequest(@Body() requestDto: RequestDto) {
    return await this.adminService.approveAccountActivationRequest(requestDto);
  }

  @Post('accounts/requests/reject')
  async rejectAccountActivationRequest(@Body() requestDto: RequestDto) {
    return await this.adminService.rejectAccountActivationRequest(requestDto);
  }
}
