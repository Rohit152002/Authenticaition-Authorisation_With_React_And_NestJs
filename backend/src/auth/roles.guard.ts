import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/users/entity/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
