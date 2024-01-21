import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const PORT = config.get('server.port');
  const entryPoint = config.get('server.apiEntrypoint');

  app.setGlobalPrefix(entryPoint);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const docsConfig = new DocumentBuilder()
    .setTitle('Track my money API')
    .setDescription('Documentation how to use Track my money API')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, docsConfig);
  SwaggerModule.setup('/api-docs', app, document);

  await app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started on port ${PORT}`);
  });
}
bootstrap();
