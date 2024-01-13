import type { PageDto } from '../../common/dto';
import type { IPaginatedResult } from '../../common/types';
import type { CreateUserDto } from './dto';
import type { Role, User } from '@prisma/client';

import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../../common/constatns';
import { createInfoData } from '../../common/helpers';
import serverConfig from '../../config/server.config';
import { RolesService } from '../roles/roles.service';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(serverConfig.KEY)
    private config: ConfigType<typeof serverConfig>,
    private userRepository: UsersRepository,
    private rolesService: RolesService,
  ) {}

  async getUsers(
    pageDto: PageDto,
    endpoint: string,
  ): Promise<IPaginatedResult<User>> {
    const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = pageDto;
    const { users, total } = await this.userRepository.getUsers(page, limit);

    return {
      info: createInfoData(total, page, limit, endpoint),
      result: users,
    };
  }

  async getUser(id: User['id']) {
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async createUser(dto: CreateUserDto) {
    const candidate = await this.getUserByEmail(dto.email);

    if (candidate) {
      throw new BadRequestException('Email already in use');
    }

    const hashPassword = await bcrypt.hash(
      dto.password,
      this.config.saltRounds,
    );
    const role = await this.rolesService.getRoleByValue(this.config.userRole);
    const payload = {
      ...dto,
      password: hashPassword,
      roles: {
        create: [{ roleId: role.id }],
      },
    };

    // @ts-ignore TODO Add currency!
    return this.userRepository.createUser(payload);
  }

  async activateUser(id: User['id']) {
    const user = await this.userRepository.updateUser(id, { activated: true });

    // TODO investigate why user every time not null/added endpoint for activation
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async toggleUserRole(id: User['id'], roleValue: Role['value']) {
    const user = await this.getUser(id);
    const role = await this.rolesService.getRoleByValue(roleValue);
    await this.userRepository.toggleUserRole(user.id, role.id);

    return this.getUser(id);
  }

  getUserById(id: User['id']) {
    return this.userRepository.getUserById(id);
  }

  getUserByEmail(email: User['email']) {
    return this.userRepository.getUserByEmail(email);
  }
}
