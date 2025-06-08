import { type Static, Type } from '@sinclair/typebox';

export const ProfileDto = Type.Object({
  username: Type.String(),
  bio: Type.Union([Type.String(), Type.Null()]),
  image: Type.Union([Type.String(), Type.Null()]),
  following: Type.Boolean(),
});

export const ProfileResponseDto = Type.Object({
  profile: ProfileDto,
});

export type ProfileResponseDto = Static<typeof ProfileResponseDto>;
