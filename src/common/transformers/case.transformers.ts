import type { MaybeType } from '../types';
import type { TransformFnParams } from 'class-transformer/types/interfaces';

export const lowerCaseTransformers = (
  params: TransformFnParams,
): MaybeType<string> => params.value?.toLowerCase().trim();

export const upperCaseTransformers = (
  params: TransformFnParams,
): MaybeType<string> => params.value?.toUpperCase().trim();
