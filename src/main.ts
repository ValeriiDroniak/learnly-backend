import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { UserModule } from './user/user.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Learnly.io API')
    .setDescription('API documentation for Learnly.io')
    .setVersion('1.0.0')
    .setContact('Valerii', 'https://dvs-studio.io', 'suport@dvs-studio.io')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [UserModule],
  });

  SwaggerModule.setup('/docs', app, document, {
    jsonDocumentUrl: '/swagger.json',
    customSiteTitle: 'Learnly.io Api docs',
  });

  await app.listen(3000);
  console.log('🚀 Server success running on http://localhost:3000');
}
bootstrap().catch((err) => {
  console.error('Aplication failed to start: ', err);
});
