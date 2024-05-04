import { type Metadata } from 'next'

import { TeacherMeTemplate } from '@templates/TeacherMeTemplate'

export const metadata: Metadata = {
    title: 'سامانه دانشجویی | پروفایل کاربری',
}

const page = () => {
    return <TeacherMeTemplate />
}

export default page
