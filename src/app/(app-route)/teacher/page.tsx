import React from 'react'
import { type Metadata } from 'next'

import { TeacherTemplate } from '@templates/TeackerTemplate'

export const metadata: Metadata = {
    title: 'سامانه دانشجویی | پنل استاد',
}

const page = () => {
    return <TeacherTemplate />
}

export default page
