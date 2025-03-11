import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuardToken } from './token.guard';
import { JwtService } from '@nestjs/jwt'; // ✅ Import JwtService
import { RolesGuard } from './roles.guard';
import { UserRole } from '../users/entity/user.entity';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let usersService: UsersService;

  const mockAuthService = {
    validateUser: jest.fn((email, password) => ({
      id: 1,
      email,
      role: UserRole.USER,
    })),
    login: jest.fn(() => ({ access_token: 'mocked_token' })),
  };

  const mockUsersService = {
    createUser: jest.fn((email, password, role) => ({
      id: 1,
      email,
      role: role || UserRole.USER,
    })),
    findByEmail: jest.fn((email) => ({ id: 1, email, role: UserRole.USER })),
  };

  const mockJwtService = {
    sign: jest.fn(() => 'mocked_token'),
    verify: jest.fn(() => ({
      id: 1,
      email: 'test@test.com',
      role: UserRole.USER,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService }, // ✅ Provide JwtService
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });
});
