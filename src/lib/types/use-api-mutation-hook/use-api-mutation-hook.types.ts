import {
    type TMutationErrorType,
    type TMutationResponseType,
    type TUseAppMutationOptionsType,
    type TUseAppMutationResponseType,
} from '@lib/tanstack-query/use-app-mutation'

// Custom options type on top of useAppMutation options type
type TCustomMutationOptionsType<TData, TError, TVariables, TContext> = Omit<
    TUseAppMutationOptionsType<TData, TError, TVariables, TContext>,
    'mutationFn'
>

// Custom result type on top of useAppMutation result type
type TCustomMutationResultType<TData, TError, TVariables, TContext> = TUseAppMutationResponseType<
    TData,
    TError,
    TVariables,
    TContext
>

// Final Reusable Type For Wrapper Mutation Hooks
type TUseApiMutationHookType<TData, UExtraParameters = NonNullable<unknown>, TVariables = unknown> = (
    parameters: {
        mutationOptions?: TCustomMutationOptionsType<
            TMutationResponseType<TData>,
            TMutationErrorType,
            TVariables,
            unknown
        >
    } & UExtraParameters
) => TCustomMutationResultType<TMutationResponseType<TData>, TMutationErrorType, TVariables, unknown>

export default TUseApiMutationHookType
