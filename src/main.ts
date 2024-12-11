import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AdminSeeder } from './modules/seeders/admin.seeder';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const adminSeeder = app.get(AdminSeeder);

  const port = configService.get<number>('PORT');

  try {
    await adminSeeder.seed();
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
