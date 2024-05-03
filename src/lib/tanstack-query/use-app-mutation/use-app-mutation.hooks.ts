import { type QueryClient, useMutation } from '@tanstack/react-query'

import type {
    TMutationErrorType,
    TMutationResponseType,
    TUseAppMutationOptionsType,
    TUseAppMutationResponseType,
} from './use-app-mutation.types'

const useAppMutation = <TData = unknown, TError = TMutationErrorType, TVariables = unknown, TContext = unknown>(
    options: TUseAppMutationOptionsType<TMutationResponseType<TData>, TError, TVariables, TContext>,
    queryClient?: QueryClient
): TUseAppMutationResponseType<TMutationResponseType<TData>, TError, TVariables, TContext> =>
    useMutation(options, queryClient)

export default useAppMutation
