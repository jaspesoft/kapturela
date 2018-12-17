import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { HttpStrategy } from './http.strategy';
import { SettingsModule } from 'dist/kapture/apps/settings/settings.module';
import { SettingsService } from '../settings/settings.service';
import { settingsProviders } from '../settings/models/settings.providers';
import { walletsProviders } from '../wallets/providers/wallets.providers';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        SettingsModule,
        PassportModule.register({ defaultStrategy: 'bearer' }),
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
