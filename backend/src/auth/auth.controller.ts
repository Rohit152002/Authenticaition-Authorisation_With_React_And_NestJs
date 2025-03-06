import { UsersService } from './../users/users.service';
import { Body, Controller, Ip, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRole } from 'src/users/entity/user.entity';
import { RolesGuard } from './roles.guard';
import { Roles } from './auth.decorator';
import { JwtAuthGuardToken } from './token.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(
    @Body() body: { email: string; password: string; role?: UserRole },
  ) {
    return this.usersService.createUser(body.email, body.password, body.role);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }

  @Post('profile')
  @UseGuards(JwtAuthGuardToken)
  getProfile(@Request() req) {
    console.log('helloworld something goes here ');

    return this.usersService.findByEmail(req.user.email);
  }

  @Post('admin-data')
  @UseGuards(JwtAuthGuardToken, RolesGuard)
  @Roles(UserRole.ADMIN)
  getAdminData() {
    return { message: 'This is admin-only data' };
  }
}
