import { type FC, type PropsWithChildren } from 'react'

import { TeacherLayout } from '@partials/layouts/TeacherLayout'

const layout: FC<PropsWithChildren> = ({ children }) => {
    return <TeacherLayout>{children}</TeacherLayout>
}

export default layout
