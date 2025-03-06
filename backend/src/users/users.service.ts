import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private readonly users = ['hello', 'people'];

  async createUser(
    email: string,
    password: string,
    role: UserRole = UserRole.USER,
  ): Promise<User> {
    if (await this.findByEmail(email)) {
      throw new ForbiddenException('user already exist');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({
      email,
      password: hashedPassword,
      role,
    });
    return this.usersRepository.save(newUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  getAllUser(): string[] {
    return this.users;
  }
}
