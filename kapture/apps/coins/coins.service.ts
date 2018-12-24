import { Injectable, Inject } from '@nestjs/common';
import { cy_coins } from 'dist/dist/kapture/apps/coins/models/coins.interface';
import { Model } from 'mongoose';

@Injectable()
export class CoinsService {
    constructor(@Inject('CoinsModel') public readonly coinsModel: Model<cy_coins>) {}

    async setSaveCoin(coin: cy_coins): Promise<cy_coins> {
        const newCoin = new this.coinsModel(coin);
        await newCoin.validate();
        return await newCoin.save();
    }

    async validateCoin(coin: string): Promise<any> {
        const data = await this.coinsModel.find({symbol: coin });

        if (data.length > 0) {
            return {
                message: 'The coin is already registered',
                state: 'faild',
            };
        } else {
            return {
                state: 'ok',
            };
        }
    }
}
