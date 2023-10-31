import { Module } from '@nestjs/common';
import serverConfig from '../config/server.config';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '../config/database.config';
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
