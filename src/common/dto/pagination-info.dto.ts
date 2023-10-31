import type { IInfoData } from '../types';

import { ApiProperty } from '@nestjs/swagger';

import { NullableType } from '../types';

export class PaginationInfoDto implements IInfoData {
  @ApiProperty({ example: 240, description: 'Entities in database count' })
  total: number;

  @ApiProperty({
    example: 'http://localhost:8080/api/characters?page=2&limit=20',
    description: 'URL for the next page or null',
  })
  next: NullableType<string>;

  @ApiProperty({
    example: null,
    description: 'URL for the previous page or null',
  })
  prev: NullableType<string>;

  @ApiProperty({
    example: 12,
    description: 'Pages count in accordance to limit per page',
  })
  pages: number;
}
