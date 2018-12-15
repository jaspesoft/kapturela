import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletsModule } from './apps/wallets/wallets.module';
import { Network } from './shared/provider/wallets/network';
import { WalletsService } from './shared/services/wallets/wallets.service';
import { SettingsModule } from './apps/settings/settings.module';
import { CoinsModule } from './apps/coins/coins.module';

@Module({
  imports: [
    WalletsModule,
    SettingsModule,
    CoinsModule,
  ],
  controllers: [AppController],
  providers: [AppService, Network, WalletsService],
})
export class AppModule { }
