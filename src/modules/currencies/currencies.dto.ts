import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { type Currency } from '@prisma/client';

import { upperCaseTransformers } from '../../common/transformers';

export class CreateCurrencyDto {
  @ApiProperty({ example: 'UAH', description: 'Currency abbreviation' })
  @IsString()
  @Transform(upperCaseTransformers)
  @Length(3, 3, { message: 'currency should be at 3 characters code' })
  currency: string;
}

export class CurrencyDto implements Currency {
  @ApiProperty({ example: 3, description: 'Uniq currency id' })
  id: number;

  @ApiProperty({ example: 'UAH', description: 'Currency abbreviation' })
  currency: string;
}
