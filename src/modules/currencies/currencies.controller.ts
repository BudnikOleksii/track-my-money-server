import type { Currency } from '@prisma/client';

import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { CreateCurrencyDto, CurrencyDto } from './currencies.dto';
import { CurrenciesService } from './currencies.service';

@ApiTags('Currencies')
@Controller('currencies')
export class CurrenciesController {
  constructor(private currenciesService: CurrenciesService) {}

  @ApiOperation({ summary: 'Create new currency' })
  @ApiOkResponse({ status: 201, type: CurrencyDto })
  @ApiException(() => BadRequestException, {
    description: 'Currency already exists',
  })
  @Post()
  async create(@Body() dto: CreateCurrencyDto): Promise<CurrencyDto> {
    return this.currenciesService.create(dto);
  }

  @ApiOperation({ summary: 'Get all currencies' })
  @ApiOkResponse({ status: 200, type: CurrencyDto })
  @Get()
  async getAll(): Promise<CurrencyDto[]> {
    return this.currenciesService.getAll();
  }

  @ApiOperation({ summary: 'Get currency by id' })
  @ApiParam({ name: 'id', type: String, description: 'Currency id' })
  @ApiOkResponse({ status: 200, type: CurrencyDto, isArray: true })
  @ApiException(() => NotFoundException, { description: 'Currency not found' })
  @Get(':id')
  async getCurrency(
    @Param('id', ParseIntPipe) id: Currency['id'],
  ): Promise<CurrencyDto> {
    return this.currenciesService.getById(id);
  }
}
