import { Connection } from 'mongoose';
import { CoinShema } from './coins.schema';

export const coinsProviders = [
  {
    provide: 'CoinsModel',
    useFactory: (connection: Connection) => connection.model('cy_coins', CoinShema),
    inject: ['DataBaseConnection'],
  },

];
