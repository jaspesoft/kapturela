import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DataBaseConnection',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect('mongodb://localhost/jaspe_sima'),
  },
];
