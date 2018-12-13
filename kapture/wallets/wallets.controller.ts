import { Controller, Get } from '@nestjs/common';
import { WalletsProvider } from './provider/wallets-provider';

@Controller('wallets')
export class WalletsController {

    constructor(private wallet: WalletsProvider) { }

    @Get()
    public create() {
        return  this.wallet.setGenerateAccount('ONX');
    }
}
