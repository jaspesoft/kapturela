import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { adm_country, adm_user } from './settings.interface';

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
      return await newUser.save();
    } catch (err) {
      return err.errors;
    }
  }
  async countries(): Promise<adm_country[]> {
    return this.countryModel.find().exec();
  }
}
