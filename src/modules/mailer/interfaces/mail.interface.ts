import { City } from 'src/common/enums/city.enum';
import { Gender } from 'src/common/enums/gender.enum';
import { Grade } from 'src/common/enums/grade.enum';
import { Interest } from 'src/common/enums/interest.enum';

export interface IMail {
  to: string;
  firstName?: string;
  lastName?: string;
  grade?: Grade;
  interests?: Interest[];
  city?: City;
  gender?: Gender;
}
