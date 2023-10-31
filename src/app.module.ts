import { Module } from '@nestjs/common';
import serverConfig from '../config/server.config';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '../config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [serverConfig, databaseConfig],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
