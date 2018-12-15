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

// tslint:disable-next-line:class-name
export interface adm_state extends Document {
    readonly name_state: string;
    readonly country: string;
}

// tslint:disable-next-line:class-name
export interface adm_city extends Document {
    readonly name_city: string;
    readonly country: string;
    readonly state: string;
}
