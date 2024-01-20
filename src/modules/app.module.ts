import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import databaseConfig from '../config/database.config';
import serverConfig from '../config/server.config';
import { CurrenciesModule } from './currencies/currencies.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [serverConfig, databaseConfig],
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    CurrenciesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
