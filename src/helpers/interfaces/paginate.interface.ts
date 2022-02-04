import { Model } from 'mongoose'

export interface IPaginateOptions {
  select?: object | string
  collation?: object
  sort?: string
  populate?: object
  projection?: object | string
  lean?: boolean
  leanWithId?: boolean
  offset?: number
  page?: number
  limit?: number
  customLabels?: object
  pagination?: boolean
  useEstimatedCount?: boolean
  useCustomCountFn?: boolean
  forceCountFn?: boolean
  allowDiskUse?: boolean
  read?: object
  options?: object
}

export interface IPaginateResult<T> {
  docs: T[]
  totalDocs: number
  limit: number
  hasPrevPage: boolean
  hasNextPage: boolean
  page: number
  totalPages: number
  offset: number
  prevPage: number
  nextPage: number
  pagingCounter: number
  meta: object
}

export interface IPaginate<T> {
  paginate: (query?: object, options?: IPaginateOptions, callback?: Function) => Promise<IPaginateResult<T>>
}

export type IPaginateModel<T> = Model<T> & IPaginate<T>
