import type { Role } from '@prisma/client';

import { Injectable, NotFoundException } from '@nestjs/common';

import { RolesRepository } from './roles.repository';

@Injectable()
export class RolesService {
  constructor(private rolesRepository: RolesRepository) {}

  async getRoleByValue(value: Role['value']) {
    const role = await this.rolesRepository.getRoleByValue(value);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }
}
