import { type FC, useState } from 'react'
import { type FileWithPath, MS_EXCEL_MIME_TYPE } from '@mantine/dropzone'
import { IconUpload } from '@tabler/icons-react'

import { DDropzone } from '@molecules/DDropzone'

import { DButton } from '@atoms/DButton'

import { type IAdminCreateTeacherUploadModalProps } from './resources'

const AdminCreateTeacherUploadModal: FC<IAdminCreateTeacherUploadModalProps> = ({ onClose }) => {
    const [files, setFiles] = useState<FileWithPath[]>([])

    return (
        <section className='flex flex-col gap-6'>
            <DDropzone
                files={files}
                setFiles={setFiles}
                maxSize={50000}
                accept={MS_EXCEL_MIME_TYPE}
                maxFiles={1}
                handleUpload={() => {}}
            />
            <div className='flex gap-x-4 justify-end'>
                <DButton onClick={onClose} type='button' variant='outline'>
                    انصراف
                </DButton>
                <DButton type='button' leftSection={<IconUpload />}>
                    آپلود
                </DButton>
            </div>
        </section>
    )
}

export default AdminCreateTeacherUploadModal
