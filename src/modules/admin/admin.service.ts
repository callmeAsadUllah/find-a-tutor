import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AccountActivationRequest,
  AccountActivationRequestDocument,
} from './admin.schema';
import { UsersService } from '../users/users.service';
import { AccountActivationRequestDto, RequestDto } from './dtos/admin.dto';

@Injectable()
export class AdminService implements OnModuleInit {
  constructor(
    @InjectModel(AccountActivationRequest.name)
    private readonly requestModel: Model<AccountActivationRequestDocument>,
    private readonly usersService: UsersService,
  ) {}

  async onModuleInit() {
    console.log('AdminService initialized');
  }

  async sendAccountActivationRequest(
    accountActivationRequestDto: AccountActivationRequestDto,
  ) {
    const user = await this.usersService.getUserById(
      accountActivationRequestDto.userId,
    );

    if (!user) {
      throw new Error('User not found');
    }

    const existingRequest = await this.requestModel.findOne({
      userId: accountActivationRequestDto.userId,
    });

    if (existingRequest) {
      throw new Error('Verification request already sent');
    }

    const request = new this.requestModel({ ...accountActivationRequestDto });
    await request.save();

    return request;
  }

  async approveAccountActivationRequest(requestDto: RequestDto) {
    const request = await this.requestModel.findById(requestDto.requestId);

    if (!request) {
      throw new Error('Verification request not found');
    }

    await this.usersService.getUserByIdAndUpdate(request.userId, {
      isActive: true,
    });

    await this.requestModel.findByIdAndDelete(requestDto.requestId);

    return {
      message: 'Account activation request approved successfully',
    };
  }

  async rejectAccountActivationRequest(requestDto: RequestDto) {
    const request = await this.requestModel.findById(requestDto.requestId);

    if (!request) {
      throw new Error('Activation request not found');
    }

    return this.requestModel.findByIdAndDelete(requestDto.requestId);
  }

  async findAllAVerificationRequests() {
    return this.requestModel.find().populate('userId').exec();
  }
}
