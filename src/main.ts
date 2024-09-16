import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { graphqlUploadExpress } from 'graphql-upload-ts';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [process.env.CLIENT_URL, '*'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    },
  });
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));

  const config = new DocumentBuilder()
    .setTitle('Puzzle App')
    .setDescription('Документация GrapqQl')
    .setVersion('1.0.0')
    .addTag('Ilya Dvorchuk')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () =>
    console.log(`Server Ok start, PORT = ${PORT} ${process.env.CLIENT_URL}`),
  );
}
bootstrap();
