import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '@/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, PassportModule, JwtModule, TypeOrmModule],
      providers: [AuthService, JwtStrategy],
      controllers: [AuthController],
      exports: [AuthService, JwtModule],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('should register a user', async () => {
  //   const result = await controller.register({
  //     email: 'test@test.com',
  //     password: 'password',
  //   });

  //   expect(result).toEqual({ id: 1, email: 'test@test.com' });
  //   expect(usersService.createUser).toHaveBeenCalledWith({
  //     email: 'test@test.com',
  //     password: 'password',
  //   });
  // });

  // it('should login a user', async () => {
  //   const result = await controller.login({
  //     email: 'test@test.com',
  //     password: 'password',
  //   });

  //   expect(result).toEqual({ access_token: 'token' });
  //   expect(authService.validateUser).toHaveBeenCalledWith(
  //     'test@test.com',
  //     'password',
  //   );
  //   expect(authService.login).toHaveBeenCalledWith({
  //     id: 1,
  //     email: 'test@test.com',
  //   });
  // });

  // it('should get profile', () => {
  //   const req = { user: { id: 1, email: 'test@test.com' } };
  //   const result = controller.getProfile(req);

  //   expect(result).toEqual(req.user); // ✅ Fix expected result
  // });

  // it('should get admin data', () => {
  //   const result = controller.getAdminData();

  //   expect(result).toEqual({ message: 'This is admin-only data' });
  // });
});
