import { useState } from 'react'
import { type FileWithPath } from '@mantine/dropzone'
import { IconCheck } from '@tabler/icons-react'

import { DDropzone } from '@molecules/DDropzone'

import { DButton } from '@atoms/DButton'
import { DSelect } from '@atoms/DSelect'
import { DTextInput } from '@atoms/DTextInput'

const AdminCreateTeacher = () => {
    const [files, setFiles] = useState<FileWithPath[]>([])

    return (
        <section className='flex flex-col gap-6'>
            <p>ثبت استاد</p>

            <form className='bg-white grid grid-cols-4 gap-6 p-6'>
                <DTextInput withAsterisk label='نام' />
                <DTextInput withAsterisk label='نام خانوادگی' />
                <DTextInput withAsterisk label='کد ملی' />
                <DTextInput withAsterisk label='شماره تماس' />
                <DTextInput withAsterisk label='سن' type='number' />
                <DSelect withAsterisk data={['مرد', 'زن']} label='جنسیت' />
                <DSelect
                    withAsterisk
                    data={['کاردانی', 'کارشناسی', 'کارشناسی ارشد', 'دکترا', 'فوق دکترا']}
                    label='مدرک تحصیلی'
                />
                <DTextInput withAsterisk label='آدرس' />
                <div className='col-span-4 '>
                    <DDropzone
                        label='تصویر پروفایل'
                        files={files}
                        setFiles={setFiles}
                        maxFiles={1}
                        accept={['PNG', 'JPG']}
                        maxSize={1000000}
                        handleUpload={() => {}}
                    />
                </div>
                <div className='col-span-4 flex justify-end'>
                    <DButton leftSection={<IconCheck />}>ثبت</DButton>
                </div>
            </form>
        </section>
    )
}

export default AdminCreateTeacher
