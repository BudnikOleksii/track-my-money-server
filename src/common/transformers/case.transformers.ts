import type { MaybeType } from '../types';
import type { TransformFnParams } from 'class-transformer/types/interfaces';

export const lowerCaseTransformer = (
  params: TransformFnParams,
): MaybeType<string> => params.value?.toLowerCase().trim();

export const upperCaseTransformer = (
  params: TransformFnParams,
): MaybeType<string> => params.value?.toUpperCase().trim();
