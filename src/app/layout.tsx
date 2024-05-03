import { type FC, type PropsWithChildren } from 'react'
import { ColorSchemeScript } from '@mantine/core'

import { RootProviders } from '@partials/providers'

import { IranYekanFont } from '@core/utils/fonts'

import '@styles/globals.css'

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <html lang='fa' dir='rtl'>
            <head>
                <ColorSchemeScript />
            </head>
            <body className={`${IranYekanFont.variable} font-iran-yekan bg-[#F0F2F5] min-w-[360px]`}>
                <RootProviders>{children}</RootProviders>
            </body>
        </html>
    )
}

export default RootLayout
