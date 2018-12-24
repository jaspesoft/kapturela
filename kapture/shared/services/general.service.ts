import { Injectable } from '@nestjs/common';
import {createHmac} from 'crypto';

@Injectable()
export class GeneralService {
    public getRandom(length: number): string {
        let result: string;
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        for (let i = length; i > 0; --i) {
          result = result + chars[Math.floor(Math.random() * chars.length)];
        }
        return result.replace('undefined', '');
    }
    public async makePassword(pass: string): Promise<string> {
        return createHmac('sha256', pass).digest('hex');
    }
}
