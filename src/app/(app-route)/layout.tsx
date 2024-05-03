import { type FC, type PropsWithChildren } from 'react'

import { DAppLayout } from '@partials/layouts/DAppLayout'

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
    return <DAppLayout>{children}</DAppLayout>
}

export default AppLayout
