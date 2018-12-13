import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { WalletsProvider } from './provider/wallets-provider';


@Module({
  controllers: [WalletsController],
  providers: [WalletsProvider],
})
export class WalletsModule {}
