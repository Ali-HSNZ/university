import { type FC, type PropsWithChildren } from 'react'

import { AdminLayout } from '@partials/layouts/AdminLayout'

const layout: FC<PropsWithChildren> = ({ children }) => {
    return <AdminLayout>{children}</AdminLayout>
}

export default layout
