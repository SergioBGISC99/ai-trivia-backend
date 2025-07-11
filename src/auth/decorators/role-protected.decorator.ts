import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../enums/valid-roles.enum';

export const META_ROLES = 'role';

export const RoleProtected = (role: ValidRoles) => {
  return SetMetadata('role', role);
};
