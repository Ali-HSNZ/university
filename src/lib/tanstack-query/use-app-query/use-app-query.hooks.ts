import { type QueryClient, useQuery } from '@tanstack/react-query'

import {
    type TQueryErrorType,
    type TQueryResponseType,
    type TUseAppQueryOptionsType,
    type TUseAppQueryResponseType,
} from './use-app-query.types'

const useAppQuery = <TQueryFnData = unknown, TError = TQueryErrorType, TData = TQueryFnData>(
    options: TUseAppQueryOptionsType<TQueryResponseType<TQueryFnData>, TError, TQueryResponseType<TData>>,
    queryClient?: QueryClient
): TUseAppQueryResponseType<TQueryResponseType<TData>, TError> => useQuery(options, queryClient)

export default useAppQuery
