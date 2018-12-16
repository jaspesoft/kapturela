import { Document } from 'mongoose';

// tslint:disable-next-line:class-name
export interface wal_accounts extends Document {
  readonly seed: string;
  readonly user: string;
}
