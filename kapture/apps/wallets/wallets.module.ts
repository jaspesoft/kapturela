import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { walletsProviders } from './models/wallets.providers';
import { DatabaseModule } from 'kapture/database/database.module';
import { WalletsService } from './wallets.service';
import {coinsProviders} from '../coins/models/coins.providers';

@Module({
  controllers: [WalletsController],
  imports: [
      DatabaseModule,
  ],
  providers: [
      ...walletsProviders,
      WalletsService,
      ...coinsProviders,
  ]
})
export class WalletsModule {}
