import { IUser } from 'src/modules/users/interfaces/user.interface';

export interface ITutor extends IUser {
  qualifications: string[];
  subjects: string[];
  hourlyRate: number;
  availability: object;
}
