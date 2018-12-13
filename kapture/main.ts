import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/websockets/adapters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(3000);

  /*
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  */

}
bootstrap();
