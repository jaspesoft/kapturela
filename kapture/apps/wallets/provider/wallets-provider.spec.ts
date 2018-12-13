import { Test, TestingModule } from '@nestjs/testing';
import { WalletsProvider } from './wallets-provider';

describe('WalletsProvider', () => {
  let provider: WalletsProvider;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletsProvider],
    }).compile();
    provider = module.get<WalletsProvider>(WalletsProvider);
  });
  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
