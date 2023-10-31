import type { NullableType } from './util-types';

export interface IInfoData {
  total: number;
  next: NullableType<string>;
  prev: NullableType<string>;
  pages: number;
}

export interface IPaginatedResult<T> {
  info: IInfoData;
  result: T[];
}
