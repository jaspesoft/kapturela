import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletsModule } from './apps/wallets/wallets.module';
import { Network } from './shared/provider/wallets/network';
import { SettingsModule } from './apps/settings/settings.module';
import { CoinsModule } from './apps/coins/coins.module';
import { MailerModule } from '@nest-modules/mailer';
import { Wallets } from './shared/provider/wallets/wallets';

@Module({
  imports: [
    WalletsModule,
    SettingsModule,
    CoinsModule,
    MailerModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
      AppService,
      Network,
      Wallets,
  ],
})
export class AppModule { }
