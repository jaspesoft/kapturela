import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { Wallets } from './providers/wallets';
import {WalletsService} from '../../shared/services/wallets/wallets.service';

@Module({
  controllers: [WalletsController],
  imports: [],
  providers: [
      Wallets,
      WalletsService,
  ],
})
export class WalletsModule {}
