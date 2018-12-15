import { Connection } from 'mongoose';
import { CoinShema } from './coins.schema';

export const coinsProviders = [
  {
    provide: 'CoinsModel',
    useFactory: (connection: Connection) => connection.model('adm_countries', CoinShema),
    inject: ['DataBaseConnection'],
  },

];
