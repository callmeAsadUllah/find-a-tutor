import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  // async verifyAccount(Id: string, role: string): Promise<any> {
  //         let entity;
  //         switch (role) {
  //             case 'patient':
  //                 entity = await this.userModel.findById(Id);
  //                 break;
  //             case 'hospital':
  //                 entity = await this.hospitalModel.findById(Id);
  //                 break;
  //             default:
  //                 throw new Error('Invalid account type');
  //         }
  //
  //         if (!entity) {
  //             throw new Error('Entity not found', 404);
  //         }
  //
  //         if (entity.isActive) {
  //             throw new Error('This account is already verified', 400);
  //         }
  //         entity.isActive = true;
  //         await entity.save();
  //         return { message: ${role} account verified successfully! };
  //     }
}
