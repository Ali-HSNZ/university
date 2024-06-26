import React from 'react'
import { type Metadata } from 'next'

import { AuthTemplate } from '@templates/AuthTemplate'

export const metadata: Metadata = {
    title: 'سامانه دانشجویی | ورود',
}
const page = () => {
    return <AuthTemplate />
}

export default page
