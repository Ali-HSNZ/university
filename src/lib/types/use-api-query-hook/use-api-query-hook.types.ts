import { type QueryKey } from '@tanstack/react-query'

import {
    type TDefinedInitialDataOptionsType,
    type TQueryErrorType,
    type TQueryResponseType,
    type TUndefinedInitialDataOptionsType,
    type TUseAppQueryResponseType,
    type TUseQueryOptionsType,
} from '@lib/tanstack-query/use-app-query'

import { type TDorapiParamsType } from '../params'

type TCustomUndefinedInitialDataOptionsType<TQueryFnData, TError, TData, TQueryKey extends QueryKey = QueryKey> = Omit<
    Partial<TUndefinedInitialDataOptionsType<TQueryFnData, TError, TData, TQueryKey>>,
    'queryFn'
>

type TCustomDefinedInitialDataOptionsType<TQueryFnData, TError, TData, TQueryKey extends QueryKey = QueryKey> = Omit<
    Partial<TDefinedInitialDataOptionsType<TQueryFnData, TError, TData, TQueryKey>>,
    'queryFn'
>

type TCustomUseQueryOptionsType<TQueryFnData, TError, TData, TQueryKey extends QueryKey = QueryKey> = Omit<
    Partial<TUseQueryOptionsType<TQueryFnData, TError, TData, TQueryKey>>,
    'queryFn'
>

// Custom options type on top of useAppQuery options type
type TCustomQueryOptionsType<TQueryFnData, TError, TData, TQueryKey extends QueryKey = QueryKey> =
    | TCustomUndefinedInitialDataOptionsType<TQueryFnData, TError, TData, TQueryKey>
    | TCustomDefinedInitialDataOptionsType<TQueryFnData, TError, TData, TQueryKey>
    | TCustomUseQueryOptionsType<TQueryFnData, TError, TData, TQueryKey>

// Custom result type on top of useAppQuery result type
type TCustomQueryResultType<TData, TError> = TUseAppQueryResponseType<TData, TError>

// Final Reusable Type For Wrapper Query Hooks
type TUseApiQueryHookType<
    TData,
    UExtraParameters = NonNullable<unknown>,
    VQueryOptions = TCustomQueryOptionsType<TQueryResponseType<TData>, TQueryErrorType, TQueryResponseType<TData>>,
> = (
    parameters: {
        queryOptions?: VQueryOptions
        dorapiParams?: Omit<
            TDorapiParamsType,
            'fieldNamesToReceive' | 'relationToForeignDatabases' | 'paginationConfig'
        >
        defaultParams?: Record<string, unknown>
    } & UExtraParameters
) => TCustomQueryResultType<TQueryResponseType<TData>, TQueryErrorType>

export default TUseApiQueryHookType
