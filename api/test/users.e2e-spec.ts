import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';

process.env.JWT_ACCESS_SECRET = 'test-secret';

describe('Users (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue({
        user: {
          findMany: jest.fn(),
          count: jest.fn(),
          findUnique: jest.fn().mockResolvedValue({
            id: 1,
            email: 'test@test.com',
            roleId: 1,
            isActive: true,
            role: {
              rolePermissions: [{ permission: { code: 'users.read' } }],
            },
          }),
          delete: jest.fn(),
        },
        $transaction: jest.fn(),
        $queryRaw: jest.fn().mockResolvedValue([]),
      })
      .overrideProvider(getModelToken('AuditLog'))
      .useValue({ create: jest.fn() })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const jwtService = new JwtService({ secret: 'test-secret' });
    accessToken = jwtService.sign({ sub: 1, roleId: 1 });

    prisma = moduleFixture.get(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /users', () => {
    it('should return 401 without token', async () => {
      await request(app.getHttpServer())
        .get('/users?page=1&limit=10')
        .expect(401);
    });

    it('should return 403 if user has no permission', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce({
        id: 1,
        email: 'test@test.com',
        roleId: 1,
        isActive: true,
        role: { rolePermissions: [] },
      });

      await request(app.getHttpServer())
        .get('/users?page=1&limit=10')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(403);
    });

    it('should return paginated users', async () => {
      const mockUsers = [{ id: 1, email: 'test@test.com', isActive: true }];

      (prisma.$transaction as jest.Mock).mockResolvedValue([mockUsers, 1]);

      const res = await request(app.getHttpServer())
        .get('/users?page=1&limit=10')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.data).toEqual(mockUsers);
      expect(res.body.meta.total).toBe(1);
    });
  });
});
