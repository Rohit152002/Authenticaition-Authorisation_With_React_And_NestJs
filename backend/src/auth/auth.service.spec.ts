import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn().mockResolvedValue({
              id: 1,
              email: 'test@test.com',
              password: 'hashedPassword',
              role: 'user',
            }),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user data if validation is successful', async () => {
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);
      const result = await service.validateUser('test@test.com', 'password');
      expect(result).toEqual({
        id: 1,
        email: 'test@test.com',
        role: 'user',
      });
    });

    it('should throw BadRequestException if user is not found', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);
      await expect(
        service.validateUser('test@test.com', 'password'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if password does not match', async () => {
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);
      await expect(
        service.validateUser('test@test.com', 'password'),
      ).rejects.toThrow(BadRequestException);
    });

    // it('should throw UnauthorizedException if credentials are invalid', async () => {
    //   jest.spyOn(bcrypt, 'compare').mockReturnValue(false);
    //   await expect(
    //     service.validateUser('test@test.com', 'password'),
    //   ).rejects.toThrow(UnauthorizedException);
    // });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const user = { id: 1, email: 'test@test.com', role: 'user' };
      const result = await service.login(user);
      expect(result).toEqual({ access_token: 'token' });
      expect(jwtService.sign).toHaveBeenCalledWith({
        email: 'test@test.com',
        role: 'user',
        sub: 1,
      });
    });
  });
});
