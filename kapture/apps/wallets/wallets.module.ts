import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { WalletsProvider } from './provider/wallets-provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts, User } from './wallets.entity';

@Module({
  controllers: [WalletsController],
  imports: [TypeOrmModule.forFeature([Accounts, User])],
  providers: [WalletsProvider],
})
export class WalletsModule {}
