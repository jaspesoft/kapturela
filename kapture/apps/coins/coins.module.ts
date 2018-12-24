import { Module } from '@nestjs/common';
import {DatabaseModule} from '../../database/database.module';
import { CoinsService } from './coins.service';
import { coinsProviders } from './models/coins.providers';
import { CoinsController } from './coins.controller';

@Module({
    providers: [
        CoinsService,
        ...coinsProviders,
    ],
  imports: [DatabaseModule],
  controllers: [CoinsController],
})
export class CoinsModule { }
