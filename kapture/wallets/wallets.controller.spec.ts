import { Test, TestingModule } from '@nestjs/testing';
import { WalletsController } from './wallets.controller';

describe('Wallets Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [WalletsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: WalletsController = module.get<WalletsController>(WalletsController);
    expect(controller).toBeDefined();
  });
});
