import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletsModule } from './wallets/wallets.module';
import { Network } from './shared/provider/network';


@Module({
  imports: [WalletsModule],
  controllers: [AppController],
  providers: [AppService, Network],
})
export class AppModule {}
