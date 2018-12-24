import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { walletsProviders } from './models/wallets.providers';
import { DatabaseModule } from 'kapture/database/database.module';
import { WalletsService } from './wallets.service';
import {coinsProviders} from '../coins/models/coins.providers';
import { settingsProviders } from '../settings/models/settings.providers';
import { Wallets } from 'kapture/shared/provider/wallets/wallets';
import { Network } from 'kapture/shared/provider/wallets/network';

@Module({
  controllers: [WalletsController],
  imports: [
      DatabaseModule,
  ],
  providers: [
      ...walletsProviders,
      WalletsService,
      ...coinsProviders,
      ...settingsProviders,
      Wallets,
      Network,
  ],
})
export class WalletsModule {}
