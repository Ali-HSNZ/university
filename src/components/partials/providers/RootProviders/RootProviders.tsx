'use client'

import { type PropsWithChildren } from 'react'
import { ToastContainer } from 'react-toastify'

import { MantineProvider, QueryParamProvider, TanstackQueryProvider } from './resources'

const RootProviders = ({ children }: PropsWithChildren) => {
    return (
        <TanstackQueryProvider>
            <QueryParamProvider>
                <MantineProvider>
                    {children}
                    <ToastContainer rtl className='font-iran-yekan' />
                </MantineProvider>
            </QueryParamProvider>
        </TanstackQueryProvider>
    )
}

export default RootProviders
