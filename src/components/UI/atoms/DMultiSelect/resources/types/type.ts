type TMultiSelectValueType =
    | {
          value: string
          label: string
      }
    | string

interface IDMultiSelectProps {
    data: TMultiSelectValueType[] | undefined
    isLoading?: boolean
    placeholder?: string
    defaultWidth?: boolean
    isSuccess?: boolean
    defaultValues?: TMultiSelectValueType[]
    onChange?: (value: string) => void
    getAllSelectedList?: (values: TMultiSelectValueType[]) => void
}

export type { IDMultiSelectProps, TMultiSelectValueType }
