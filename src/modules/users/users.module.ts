import { Module } from '@nestjs/common';

import { CurrenciesModule } from '../currencies/currencies.module';
import { RolesModule } from '../roles/roles.module';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
  imports: [RolesModule, CurrenciesModule],
})
export class UsersModule {}
