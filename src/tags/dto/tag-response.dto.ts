import { Type } from '@sinclair/typebox';

export const TagResponseDto = Type.Object({
  name: Type.String(),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' }),
});

export type TagResponseDto = typeof TagResponseDto;
