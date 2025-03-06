import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuardToken implements CanActivate {
  constructor(private readonly jwtService: jwt.JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    // console.log(request);

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    console.log(token);

    if (!token) {
      throw new UnauthorizedException('Invalid token format');
    }
    try {
      const decoded = this.jwtService.verify(token, { secret: 'secretkey' });
      request.user = decoded; // Attach user to request object
      console.log(request.user);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
