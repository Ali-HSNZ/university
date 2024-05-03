import { type PropsWithChildren } from 'react'
import NextAdapterApp from 'next-query-params/app'
import { QueryParamProvider as Provider } from 'use-query-params'

const QueryParamProvider = ({ children }: PropsWithChildren) => {
    return <Provider adapter={NextAdapterApp}>{children}</Provider>
}

export default QueryParamProvider
