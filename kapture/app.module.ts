import { Module } from '@nestjs/common';
import { MailerModule } from '@nest-modules/mailer';
import { Wallets } from './shared/provider/wallets/wallets';
import { Network } from './shared/provider/wallets/network';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletsModule } from './apps/wallets/wallets.module';
import { SettingsModule } from './apps/settings/settings.module';
import { CoinsModule } from './apps/coins/coins.module';
import { AuthModule } from './apps/auth/auth.module';
import { GeneralService } from './shared/services/general.service';


@Module({
  imports: [
    WalletsModule,
    SettingsModule,
    CoinsModule,
    MailerModule.forRoot(),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
      AppService,
      Network,
      Wallets,
      GeneralService,
  ],
})
export class AppModule { }
