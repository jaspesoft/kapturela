import { Injectable, Inject } from '@nestjs/common';
import { SettingsService } from '../settings/settings.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: SettingsService) {}

  async validateTokeApps(token: string): Promise<any> {
    // Validate if token passed along with HTTP request
    // is associated with any registered account in the database
    return await this.usersService.validateUserToken(token);
  }
}
