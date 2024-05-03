import { useState } from 'react'
import { type FileWithPath } from '@mantine/dropzone'

import { DDropzone } from '@molecules/DDropzone'

import { DButton } from '@atoms/DButton'
import { DSelect } from '@atoms/DSelect'
import { DTextInput } from '@atoms/DTextInput'

const TeacherForm = () => {
    const [files, setFiles] = useState<FileWithPath[]>([])

    return (
        <form className='bg-white grid grid-cols-4 gap-6 p-6'>
            <DTextInput disabled withAsterisk defaultValue={'علی'} label='نام' />
            <DTextInput disabled withAsterisk defaultValue={'حسن زاده'} label='نام خانوادگی' />
            <DTextInput disabled withAsterisk defaultValue='4990211162' label='کد ملی' />
            <DTextInput withAsterisk label='شماره تماس' defaultValue='09302520508' />
            <DTextInput withAsterisk label='کد' disabled defaultValue={'8622798465'} />
            <DTextInput disabled withAsterisk defaultValue={'23'} label='سن' type='number' />
            <DSelect disabled withAsterisk data={['مرد', 'زن']} defaultValue={'مرد'} label='جنسیت' />
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
    )
}

export default TeacherForm
