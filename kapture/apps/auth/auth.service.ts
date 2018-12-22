import { Injectable, Inject } from '@nestjs/common';
import { SettingsService } from '../settings/settings.service';
import { AuthLogIn } from './auth.interface';
import {GeneralService} from '../../shared/services/general.service';

@Injectable()
export class AuthService {
  private _functions: GeneralService;
  constructor(private readonly usersService: SettingsService) {}

  async validateTokeApps(token: string): Promise<any> {
    // Validate if token passed along with HTTP request
    // is associated with any registered account in the database
    return await this.usersService.validateUserToken(token);
  }
  private async createTokenUser(emailUser: string): Promise<string> {
    const newToken = this._functions.getRandom(40);

    const data = await this.usersService.userModel.findOneAndUpdate(
      {email: emailUser },
      {token: newToken},
    );

    return newToken;
  }
  async logIn(dataLogin: AuthLogIn): Promise<any> {
    const passcryp = await this.usersService.makePassword(dataLogin.pass);
    const data = await this.usersService.userModel.find({
      email: dataLogin.email,
      password: passcryp,
    }).exec();

    if (data.length > 0) {
      const newtoken = await this.createTokenUser(dataLogin.email);
      return {
        status: 'ok',
        message: 'Welcome to my conexion kapture',
        toke: newtoken,
      };

    } else {
      return {
        status: 'faild',
        message: 'E-mail or password are incorrect, please try again',
      };
    }
  }
}
