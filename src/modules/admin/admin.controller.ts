import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  OnModuleInit,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AccountActivationRequestDto, RequestDto } from './dtos/admin.dto';
import { AdminService } from './admin.service';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/role.enum';
import { City } from 'src/common/enums/city.enum';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('admin')
@ApiTags('admin')
export class AdminController implements OnModuleInit {
  constructor(
    private readonly adminService: AdminService,
    private readonly usersService: UsersService,
  ) {}

  onModuleInit() {
    console.log('AdminController initialized');
  }

  @Get('accounts/users')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get all users' })
  async findAllUsers(
    @Query('city') city?: City,
    @Query('role') role?: Role,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    try {
      return await this.usersService.findAllUsers(city, role, page, limit);
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
