import { Connection } from 'mongoose';
import { UserShema, CountryShema, StateShema, CityShema } from './settings.schema';

export const settingsProviders = [
  {
    provide: 'CountryModel',
    useFactory: (connection: Connection) => connection.model('adm_countries', CountryShema),
    inject: ['DataBaseConnection'],
  },
  {
    provide: 'UserModel',
    useFactory: (connection: Connection) => connection.model('adm_users', UserShema),
    inject: ['DataBaseConnection'],
  },
  {
    provide: 'StateModel',
    useFactory: (connection: Connection) => connection.model('adm_state', StateShema),
    inject: ['DataBaseConnection'],
  },
  {
    provide: 'CityShema',
    useFactory: (connection: Connection) => connection.model('adm_cities', CityShema),
    inject: ['DataBaseConnection'],
  },
];
