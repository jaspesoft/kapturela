import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { adm_country, adm_user } from './models/settings.interface';
import { wal_accounts } from '../wallets/models/wallets.interface';
import { Wallets } from 'kapture/shared/provider/wallets/wallets';

import {GeneralService} from '../../shared/services/general.service';

@Injectable()
export class SettingsService {
  // tslint:disable-next-line:variable-name
  private _functions = new GeneralService();

  constructor(
    @Inject('UserModel') public readonly userModel: Model<adm_user>,
    @Inject('CountryModel') private readonly countryModel: Model<adm_country>,
    @Inject('AccountModel') private readonly accountModel: Model<wal_accounts>,
    @Inject('MailerProvider') private readonly mailerProvider,
  ) { }
  async validateUserToken(tokenValidate: string): Promise<any> {
    return this.userModel.find({token: tokenValidate });
  }

  async setCreateUser(user: adm_user): Promise<adm_user> {
    const newUser = new this.userModel(user);
    await this._functions.makePassword(user.password)
    .then( passEncrypt => {
      newUser.password = passEncrypt;
    });
    await newUser.validate();
    return await newUser.save((err, result) => {
      if (err !== null) {
        return err;
      }
      this.setCreateAccount({
        id: result.id,
        email: user.email,
        name: user.first_name,
        username: user.username,
      });
    });
  }

  private async setCreateAccount(user: any): Promise<wal_accounts> {
    const isNow = Date.now();
    const newAccount = new this.accountModel({
      seed: Wallets.getCreateMnemonic(),
      user_id: user.id,
      created_at: isNow,
    });
    await newAccount.validate();
    return await newAccount.save((err, result) => {
      if (err !== null) {
        return err;
      }
      this.mailerProvider.sendMail(
        {
          to: user.email,
          subject: 'Welcome to Kapture',
          template: 'welcome',
          context: {
            username: user.username,
            code: this._functions.getRandom(6),
          },
        },
      );
    });
  }

  async countries(): Promise<adm_country[]> {
    return this.countryModel.find().exec();
  }

  async validarCreateUser(userEmail: string, userName: string): Promise<any> {
    let x = await this.userModel.find({ username: userName }).exec();
    if (x.length > 0) {
      return {
        message: 'username is already registered',
        status: 'faild',
      };
    }

    x = await this.userModel.find({ email: userEmail }).exec();
    if (x.length > 0) {
      return {
        message: 'email is already registered',
        status: 'faild',
      };
    } else {
      return {
        status: 'ok',
      };
    }
  }
}
