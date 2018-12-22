import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Network } from './shared/provider/wallets/network';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private network: Network) {}

  @Get()
  getHello(): string {
    return this.network.getNetworkParams('ONX');
  }
}
