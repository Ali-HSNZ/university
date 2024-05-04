import { type PropsWithChildren } from 'react'
import { ColorSchemeScript, DirectionProvider, MantineProvider as Provider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import '@mantine/core/styles.css'

import { mantineTheme } from '@core/config/mantine'

const MantineProvider = ({ children }: PropsWithChildren) => {
    return (
        <DirectionProvider>
            <Provider theme={mantineTheme}>
                <ModalsProvider>{children}</ModalsProvider>
            </Provider>
            <ColorSchemeScript defaultColorScheme='light' />
        </DirectionProvider>
    )
}

export default MantineProvider
