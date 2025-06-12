import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidRoles } from '../enums/valid-roles.enum';
import { RoleProtected } from './role-protected.decorator';
import { UserRoleGuard } from '../guards/user-role.guard';

export function Auth(role: ValidRoles) {
  return applyDecorators(
    RoleProtected(role),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
