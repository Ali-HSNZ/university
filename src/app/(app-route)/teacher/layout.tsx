import { type FC, type PropsWithChildren } from 'react'

import { TeacherLayout } from '@partials/layouts/TeacherLayout'

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
    return <TeacherLayout>{children}</TeacherLayout>
}

export default AppLayout
