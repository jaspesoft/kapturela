import { Controller, Post, Body, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { cy_coins } from './models/coins.interface';
import { CoinsService } from './coins.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/coins')
export class CoinsController {

    constructor(private service: CoinsService) { }

    @Post('add')
    @UseGuards(AuthGuard('bearer'))
    async saveCoin(@Body() data: cy_coins, @Res() res) {
        this.service.validateCoin(data.symbol)
        .then( resp => {
            if (resp.state === 'faild') {
                return res.status(HttpStatus.OK).json(resp);
            }

            this.service.setSaveCoin(data)
            .then(() => {
                res.status(HttpStatus.CREATED).json({
                    message: 'The coin has been successfully registered',
                    state : 'ok',
                });
            })
            .catch(error => {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
            });
        });
    }
}
