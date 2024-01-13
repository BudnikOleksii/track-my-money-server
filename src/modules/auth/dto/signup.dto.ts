import { IsNumber, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { LoginDto } from './login.dto';

export class SignupDto extends LoginDto {
  @ApiProperty({ example: 'John', description: 'First name' })
  @IsString()
  @MinLength(3)
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  @IsString()
  @MinLength(3)
  lastName: string;

  @ApiProperty({ example: '3', description: 'Currency' })
  @IsNumber()
  @MinLength(3)
  baseCurrency: number;
}
