import { type FC, type FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { type FileWithPath, MIME_TYPES } from '@mantine/dropzone'
import { IconUpload } from '@tabler/icons-react'
import { IconInfoCircle } from '@tabler/icons-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { DDropzone } from '@molecules/DDropzone'

import { DButton } from '@atoms/DButton'

import { teacherBulkCreateClassMutationFn } from '@api/teacher-bulk-create-class'

import { QueryKeys } from '@core/enums/query-keys'
import { type TCriticalAny } from '@core/types/critical-any'
import { type IBaseMutationFnProps } from '@core/types/data/base-response'

import { type ITeacherCreateClassUploadModalProps } from './resources'

const TeacherCreateClassUploadModal: FC<ITeacherCreateClassUploadModalProps> = ({ onClose }) => {
    const [files, setFiles] = useState<FileWithPath[]>([])

    const queryClient = useQueryClient()

    const { isPending, mutate } = useMutation({
        mutationFn: teacherBulkCreateClassMutationFn,
        onSuccess: (res: IBaseMutationFnProps) => {
            toast.success(res.message)
            onClose()
            setFiles([])
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.LessonsList],
            })
        },
        onError: (err: TCriticalAny) => {
            if (err.errors) {
                toast.error(
                    <div className='flex flex-col gap-1'>
                        <p>{err.errors.message}</p>
                        <p>{err.errors.path}</p>
                    </div>
                )
            } else toast.error(err.message)
        },
    })

    const onSubmitForm = (form: FormEvent) => {
        form.preventDefault()
        mutate(files[0])
    }

    return (
        <form onSubmit={onSubmitForm} className='flex flex-col gap-6'>
            <div className='p-4 flex gap-4 text-sm rounded-lg items-center text-yellow-900 bg-yellow-50 border border-r-4  border-yellow-500'>
                <IconInfoCircle size={25} className='shrink-0' />
                <p>تنها در صورت تایید رئیس دانشگاه، تخصیص کلاس انجام خواهند شد</p>
            </div>
            <DDropzone
                files={files}
                setFiles={setFiles}
                maxSize={100000}
                accept={[MIME_TYPES.xlsx]}
                maxFiles={1}
                handleUpload={() => {}}
            />
            <div className='flex gap-x-4 justify-end'>
                <DButton onClick={onClose} type='button' variant='outline'>
                    انصراف
                </DButton>
                <DButton disabled={files.length === 0} type='submit' loading={isPending} leftSection={<IconUpload />}>
                    آپلود
                </DButton>
            </div>
        </form>
    )
}

export default TeacherCreateClassUploadModal
