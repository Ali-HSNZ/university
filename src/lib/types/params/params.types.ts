type TOperationType = 'and' | 'or'

type TLogicType =
    | '$eq'
    | '$ne'
    | '$lt'
    | '$lte'
    | '$gt'
    | '$gte'
    | '$in'
    | '$notIn'
    | '$contains'
    | '$null'
    | '$notNull'
    | '$between'
    | '$startsWith'
    | '$endsWith'
    | '$and'
    | '$or'

type TDorapiParamsType = {
    fieldNamesToReceive?: string[] | '*'
    relationToForeignDatabases?: { dataBaseName: string; fieldNamesToReceive?: string[] }[]
    paginationConfig?: {
        page: number
        pageSize: number
        withCount: 0 | 1 | (number & NonNullable<unknown>)
    }
    filtersConfig?: {
        operation: TOperationType
        logic: TLogicType
        targetFieldName: string
        value: string | string[]
    }[]
    sortsConfig?: {
        sortBy?: 'asc' | 'desc'
        targetFieldName: string
    }[]
}

interface TParamsType extends Record<string, unknown> {
    dorapiParams?: TDorapiParamsType
}

export type { TParamsType, TLogicType, TOperationType, TDorapiParamsType }
