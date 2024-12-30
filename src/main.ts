import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
// import { AdminSeeder } from './modules/seeders/admin.seeder';
// import { TutorSeeder } from './modules/seeders/tutor.seeder';
// import { StudentSeeder } from './modules/seeders/student.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'warn', 'log'],
  });

  const configService = app.get(ConfigService);

  // const adminSeeder = app.get(AdminSeeder);
  // const tutorSeeder = app.get(TutorSeeder);
  // const studentSeeder = app.get(StudentSeeder);

  const port = configService.get<number>('PORT');

  try {
    // await adminSeeder.seed();
    // await tutorSeeder.seed();
    // await studentSeeder.seed();

    console.log('Seeding completed');
  } catch (error) {
    console.error('Seeding failed:', error);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('find A Tutor')
    .setDescription('find A Tutor API description')
    .setVersion('1.0')
    .addTag('tutor')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(port);
}
bootstrap();
