import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { adm_country, adm_user } from './models/settings.interface';
import { wal_accounts } from '../wallets/models/wallets.interface';
import { Wallets } from 'kapture/shared/provider/wallets/wallets';

@Injectable()
export class SettingsService {
  constructor(
    @Inject('UserModel') private readonly userModel: Model<adm_user>,
    @Inject('CountryModel') private readonly countryModel: Model<adm_country>,
    @Inject('AccountModel') private readonly accountModel: Model<wal_accounts>,
    @Inject('MailerProvider') private readonly mailerProvider,
  ) {}

  async create(user: adm_user): Promise<any> {
    const newUser = new this.userModel(user);
    try {
      await newUser.validate();
      await newUser.save( (err, result) => {
        if (err !== null) {
          return err;
        }
        this.setCreateAccount({
          id: result.id,
          email: user.email,
          name: user.first_name,
        });
      });

    } catch (err) {
      return err.errors;
    }
  }
  public getRandom(length: number): string {
    let result: string;
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = length; i > 0; --i) {
      result = result + chars[Math.floor(Math.random() * chars.length)];
    }
    return result.replace('undefined', '');
  }
  private async setCreateAccount(user: any): Promise<any> {
    const isNow = Date.now();
    const newAccount = new this.accountModel({
      seed: Wallets.getEncrypt(Wallets.getCreateMnemonic() + isNow),
      user: user.id,
      created_at: isNow,
    });
    await newAccount.validate();
    await newAccount.save( (err, result) => {
      if (err !== null) {
        throw err;
      }
      this.mailerProvider.sendMail(
        {
          to: user.email,
          subject: 'Welcome to Kapture',
          template: 'welcome',
          context: {
            username: user.first_name,
            code: this.getRandom(6),
          },
        },
      );

    });
  }

  async countries(): Promise<adm_country[]> {
    return this.countryModel.find().exec();
  }
}
