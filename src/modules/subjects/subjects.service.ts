import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubjectDocument } from './subject.schema';
import { Subject } from 'rxjs';

@Injectable()
export class SubjectsService implements OnModuleInit {
  constructor(
    @InjectModel(Subject.name)
    private readonly subjectModel: Model<SubjectDocument>,
  ) {}

  async onModuleInit() {
    console.log('SubjectsService initialized');
  }
}
