import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { adm_country, adm_user } from './models/settings.interface';

@Injectable()
export class SettingsService {
  constructor(
    @Inject('UserModel') private readonly userModel: Model<adm_user>,
    @Inject('CountryModel') private readonly countryModel: Model<adm_country>,
  ) {}

  async create(user: adm_user): Promise<adm_user> {
    const newUser = new this.userModel(user);
    try {
      await newUser.validate();
      await newUser.save();
      return this.setCreateAccount(user);

    } catch (err) {
      return err.errors;
    }
  }

  private setCreateAccount(user: adm_user): adm_user {
    return user;
  }

  async countries(): Promise<adm_country[]> {
    return this.countryModel.find().exec();
  }
}
