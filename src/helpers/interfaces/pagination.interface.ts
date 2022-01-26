export interface IPagination<T> {
  result: T[]
  total: Number
  limit: Number
  offset: Number
  offsets: Number
}
