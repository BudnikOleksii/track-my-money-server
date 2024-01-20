import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { lowerCaseTransformers } from '../../../common/transformers';

export class UserEmailDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Valid email' })
  @Transform(lowerCaseTransformers)
  @IsEmail({}, { message: 'Email should be a valid email' })
  email: string;
}
