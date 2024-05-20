import React from 'react'
import { type Metadata } from 'next'

import { AdminManageFilesTemplate } from '@templates/AdminManageFilesTemplate'

export const metadata: Metadata = {
    title: 'سامانه دانشجویی | مدیریت فایل ها',
}

const page = () => {
    return <AdminManageFilesTemplate />
}

export default page
