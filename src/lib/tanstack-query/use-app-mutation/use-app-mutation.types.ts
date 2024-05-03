import { type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query'

import { type TCriticalAny } from '@core/types/critical-any'

type TMutationErrorType<TError = TCriticalAny> = {
    code: number
    errors: TError
    message: string
}

type TMutationResponseType<TData> = {
    code: number
    data: TData
    message: string
}

type TUseAppMutationOptionsType<TData, TError, TVariables, TContext> = UseMutationOptions<
    TData,
    TError,
    TVariables,
    TContext
>

type TUseAppMutationResponseType<TData, TError, TVariables, TContext> = UseMutationResult<
    TData,
    TError,
    TVariables,
    TContext
>

export type { TUseAppMutationOptionsType, TUseAppMutationResponseType, TMutationErrorType, TMutationResponseType }
