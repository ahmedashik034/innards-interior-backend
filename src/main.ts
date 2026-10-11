import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001', // or true to allow all origins during dev
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Global prefix for all APIs (optional, e.g., /api/v1)
  app.setGlobalPrefix('api');

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Interior Design Platform API')
    .setDescription('The official backend documentation for the interior design firm website and admin panel.')
    .setVersion('1.0')
    .addBearerAuth() // Prepared for future JWT Admin Auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // Swagger UI will be available at http://localhost:3000/docs

  await app.listen(3000);
  console.log(`Application is running on: http://localhost:3000/api`);
  console.log(`Swagger Docs available at: http://localhost:3000/docs`);
}
bootstrap();