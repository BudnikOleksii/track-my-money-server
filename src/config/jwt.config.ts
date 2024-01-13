import { type ConfigService } from '@nestjs/config';
import { type JwtModuleOptions } from '@nestjs/jwt';

export const getJWTConfig = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => ({
  secret: configService.get('JWT_ACCESS_SECRET'),
});
