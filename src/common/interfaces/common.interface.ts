import type { InferInsertModel, Table } from 'drizzle-orm';

/**
 * Base interface for all entities
 */
export type BaseEntity = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Interface for pagination parameters
 */
export type PaginationParams = {
  offset?: number;
  limit?: number;
};

/**
 * Interface for paginated results
 */
export type PaginatedResult<T> = {
  items: T[];
  total: number;
};

/**
 * Interface for sorting parameters
 */
export type SortParams = {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

/**
 * Interface for filtering parameters
 */
export type FilterParams = {
  [key: string]: string | number | boolean | undefined;
};

export type SystemFields = 'id' | 'createdAt' | 'updatedAt';

/**
 * Infer the new row type from the insert model
 * @param TTable - The table type
 * @returns The new row type
 */
export type InferNewRow<
  TTable extends Table,
  TConfig extends {
    dbColumnNames: boolean;
    override?: boolean;
  } = {
    dbColumnNames: false;
    override: false;
  },
> = Omit<InferInsertModel<TTable, TConfig>, SystemFields>;

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
