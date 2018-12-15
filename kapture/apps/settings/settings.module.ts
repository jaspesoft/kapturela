import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './models/configure.service';
import { settingsProviders } from './models/settings.providers';
import { DatabaseModule } from 'kapture/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SettingsController],
  providers: [
    SettingsService,
    ...settingsProviders,
  ],
})
export class SettingsModule {}
