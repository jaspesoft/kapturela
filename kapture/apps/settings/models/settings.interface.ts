import { Document } from 'mongoose';

// tslint:disable-next-line:class-name
export interface adm_country extends Document {
  readonly code_country: string;
  readonly name_country: string;
}

// tslint:disable-next-line:class-name
export interface adm_user extends Document {
  readonly dni: string;
  readonly email: string;
  readonly country: string;
  readonly username: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly password: string;
  readonly is_active: boolean;
  readonly date_joined: Date;
}
