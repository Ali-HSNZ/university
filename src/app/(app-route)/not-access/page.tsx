import { type Metadata } from 'next'

import { NotAccessTemplate } from '@templates/NotAccessTemplate'

export const metadata: Metadata = {
    title: 'سامانه دانشجویی | عدم دسترسی',
}

const page = () => {
    return <NotAccessTemplate />
}

export default page
