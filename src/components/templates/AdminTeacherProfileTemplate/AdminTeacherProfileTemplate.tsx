import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { type FileWithPath } from '@mantine/dropzone'
import { IconArrowBack } from '@tabler/icons-react'

import { DDropzone } from '@molecules/DDropzone'

import { DButton } from '@atoms/DButton'
import { DSelect } from '@atoms/DSelect'
import { DTextInput } from '@atoms/DTextInput'

const AdminTeacherProfileTemplate = () => {
    const [files, setFiles] = useState<FileWithPath[]>([])

    const { push } = useRouter()

    return (
        <section>
            <div className='w-full flex justify-between items-center'>
                <p>پروفایل استاد</p>
                <DButton onClick={() => push('/admin/teachers')} variant='outline' leftSection={<IconArrowBack />}>
                    لیست اساتید
                </DButton>
            </div>
            <form className='bg-white grid grid-cols-4 mt-6 gap-6 p-6'>
                <DTextInput withAsterisk defaultValue={'علی'} label='نام' />
                <DTextInput withAsterisk defaultValue={'حسن زاده'} label='نام خانوادگی' />
                <DTextInput withAsterisk defaultValue='4990211162' label='کد ملی' />
                <DTextInput withAsterisk label='شماره تماس' defaultValue='09302520508' />
                <DTextInput withAsterisk label='کد' defaultValue={'8622798465'} />
                <DTextInput withAsterisk label='رمز عبور' />
                <DTextInput withAsterisk defaultValue={'23'} label='سن' type='number' />
                <DSelect withAsterisk data={['مرد', 'زن']} defaultValue={'مرد'} label='جنسیت' />
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
                    <DButton>تایید</DButton>
                </div>
            </form>
        </section>
    )
}

export default AdminTeacherProfileTemplate
