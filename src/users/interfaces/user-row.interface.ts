import type { InferNewRow } from '@/common/interfaces';
import type { InferSelectModel } from 'drizzle-orm';
import type { users } from '../users.schema';

export type UserRow = InferSelectModel<typeof users>;
export type NewUserRow = InferNewRow<typeof users>;
export type UpdateUserRow = Partial<NewUserRow>;
