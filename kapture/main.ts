import { NestFactory, FastifyAdapter } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/websockets/adapters';
import { join } from 'path';
import * as hbs from 'hbs';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(3200);

}
bootstrap();
