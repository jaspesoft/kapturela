import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from 'kapture/apps/wallets/wallets.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(Accounts)
        private readonly photoRepository: Repository<Accounts>,
    ) { }
}
