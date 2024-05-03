import {
    type DefinedInitialDataOptions,
    type DefinedUseQueryResult,
    type QueryKey,
    type UndefinedInitialDataOptions,
    type UseQueryOptions,
    type UseQueryResult,
} from '@tanstack/react-query'

import { type TCriticalAny } from '@core/types/critical-any'

type TQueryErrorType = {
    code: number
    errors: TCriticalAny
    message: string
}

type TQueryResponseType<TData> = {
    code: number
    data: TData
    message: string
    meta?: {
        pagination?: {
            total?: number
            page?: number
            pageSize?: number
            pageCount?: number
            skip?: number
            limit?: number
        }
    }
}

type TUndefinedInitialDataOptionsType<
    TQueryFnData,
    TError,
    TData,
    TQueryKey extends QueryKey = QueryKey,
> = UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>

type TDefinedInitialDataOptionsType<
    TQueryFnData,
    TError,
    TData,
    TQueryKey extends QueryKey = QueryKey,
> = DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>

type TUseQueryOptionsType<TQueryFnData, TError, TData, TQueryKey extends QueryKey = QueryKey> = UseQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryKey
>

type TUseAppQueryOptionsType<TQueryFnData, TError, TData, TQueryKey extends QueryKey = QueryKey> =
    | TUndefinedInitialDataOptionsType<TQueryFnData, TError, TData, TQueryKey>
    | TDefinedInitialDataOptionsType<TQueryFnData, TError, TData>
    | TUseQueryOptionsType<TQueryFnData, TError, TData, TQueryKey>

type TUseAppQueryResponseType<TData, TError> = UseQueryResult<TData, TError> | DefinedUseQueryResult<TData, TError>

export type {
    TUseAppQueryOptionsType,
    TUseAppQueryResponseType,
    TUndefinedInitialDataOptionsType,
    TDefinedInitialDataOptionsType,
    TUseQueryOptionsType,
    TQueryResponseType,
    TQueryErrorType,
}
