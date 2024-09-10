import { Test, TestingModule } from '@nestjs/testing';
import { ImagesService } from './images.service';

describe('Images', () => {
  let provider: ImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagesService],
    }).compile();

    provider = module.get<ImagesService>(ImagesService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
