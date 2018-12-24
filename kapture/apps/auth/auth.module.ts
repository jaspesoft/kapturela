import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpStrategy } from './http.strategy';
import { SettingsService } from '../settings/settings.service';
import { settingsProviders } from '../settings/models/settings.providers';
import { walletsProviders } from '../wallets/models/wallets.providers';
import { AuthController } from './auth.controller';
import { SettingsModule } from '../settings/settings.module';

@Module({
    imports: [
        SettingsModule,
    ],
    providers: [
        AuthService,
        HttpStrategy,
        SettingsService,
        ...settingsProviders,
        ...walletsProviders,
    ],
    controllers: [AuthController],
})
export class AuthModule {}
