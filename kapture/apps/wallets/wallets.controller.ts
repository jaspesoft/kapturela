import { Controller, Get } from '@nestjs/common';
import { Wallets } from './providers/wallets';

@Controller('api/v1/wallets')
export class WalletsController {

    constructor(private wallet: Wallets) { }

    @Get()
    public create() {
        return  this.wallet.setGenerateAccount('ONX');
    }
}
