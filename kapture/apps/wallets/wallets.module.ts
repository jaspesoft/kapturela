import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { walletsProviders } from './providers/wallets.providers';
import { DatabaseModule } from 'kapture/database/database.module';

@Module({
  controllers: [WalletsController],
  imports: [DatabaseModule],
  providers: [
    ...walletsProviders,
  ],
  exports: [
    ...walletsProviders,
  ],
})
export class WalletsModule {}
