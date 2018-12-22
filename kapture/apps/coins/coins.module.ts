import { Module } from '@nestjs/common';
import {DatabaseModule} from '../../database/database.module';
import { CoinsService } from './coins.service';
import { coinsProviders } from './models/coins.providers';

@Module({
    providers: [
        CoinsService,
        ...coinsProviders,
    ],
  imports: [DatabaseModule],
})
export class CoinsModule { }
