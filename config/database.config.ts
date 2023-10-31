import * as Joi from 'joi';
import { registerAs } from '@nestjs/config';

export interface DatabaseConfig {
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
  url: string;
}

export default registerAs('database', (): DatabaseConfig => {
  const values: Partial<DatabaseConfig> = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    name: process.env.DB_NAME,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    url: process.env.DATABASE_URL,
  };

  const schema: Joi.Schema<DatabaseConfig> = Joi.object({
    host: Joi.string().required(),
    port: Joi.number().required(),
    name: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    url: Joi.string().required(),
  });

  const { error } = schema.validate(values, { abortEarly: false });

  if (error) {
    throw new Error(
      `Validation failed - Is there an environment variable missing?
        ${error.message}`,
    );
  }

  return values as DatabaseConfig;
});
