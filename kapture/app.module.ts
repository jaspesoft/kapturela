import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletsModule } from './apps/wallets/wallets.module';
import { Network } from './shared/provider/network';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { WalletsService } from './shared/services/wallets/wallets.service';

@Module({
  imports: [
    WalletsModule,
    TypeOrmModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, Network, WalletsService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
