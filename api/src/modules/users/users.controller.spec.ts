import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PaginationDto } from '../../common/dto/pagination.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: jest.Mocked<UsersService>;

  const mockUsersService = {
    findAll: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call usersService.findAll with pagination', async () => {
      const pagination: PaginationDto = { page: 1, limit: 10 };

      usersService.findAll.mockResolvedValue({ data: [], meta: {} } as never);

      await controller.findAll(pagination);

      expect(usersService.findAll).toHaveBeenCalledWith(pagination);
    });
  });

  describe('remove', () => {
    it('should call usersService.delete with id', async () => {
      usersService.delete.mockResolvedValue({ id: 1 } as never);

      await controller.remove(1);

      expect(usersService.delete).toHaveBeenCalledWith(1);
    });
  });
});
