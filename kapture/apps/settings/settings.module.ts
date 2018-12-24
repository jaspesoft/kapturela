import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { settingsProviders } from './models/settings.providers';
import { DatabaseModule } from 'kapture/database/database.module';
import { walletsProviders } from '../wallets/models/wallets.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SettingsController],
  providers: [
    SettingsService,
    ...settingsProviders,
    ...walletsProviders,
  ],
})
export class SettingsModule {}
