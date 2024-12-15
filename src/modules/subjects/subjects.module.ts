import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Subject, SubjectSchema } from './subject.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Subject.name,
        useFactory: () => {
          return SubjectSchema;
        },
      },
    ]),
  ],
})
export class SubjectsModule {}
