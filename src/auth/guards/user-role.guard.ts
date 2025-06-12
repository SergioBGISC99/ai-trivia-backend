import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { User } from '../../entities/user.entity';
import { ValidRoles } from '../enums/valid-roles.enum';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: ValidRoles = this.reflector.get<ValidRoles>(
      META_ROLES,
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    if (!user) throw new BadRequestException('User not found');

    if (Array.isArray(roles) && roles.includes(user.role)) return true;

    throw new ForbiddenException(
      `User ${user.fullname} need a valid role [${roles}]`,
    );
  }
}
