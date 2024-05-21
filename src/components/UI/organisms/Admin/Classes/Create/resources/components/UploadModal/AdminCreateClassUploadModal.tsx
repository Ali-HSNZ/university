import { type FC, type FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { type FileWithPath, MIME_TYPES } from '@mantine/dropzone'
import { IconUpload } from '@tabler/icons-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { DDropzone } from '@molecules/DDropzone'

import { DButton } from '@atoms/DButton'

import { bulkCreateClassMutationFn } from '@api/bulk-create-class'

import { QueryKeys } from '@core/enums/query-keys'
import { type TCriticalAny } from '@core/types/critical-any'
import { type IAuthMutationFnProps } from '@core/types/data/auth'

import { type IAdminCreateClassUploadModalProps } from './resources'

const AdminCreateClassUploadModal: FC<IAdminCreateClassUploadModalProps> = ({ onClose }) => {
    const [files, setFiles] = useState<FileWithPath[]>([])

    const queryClient = useQueryClient()

    const { isPending, mutate } = useMutation({
        mutationFn: bulkCreateClassMutationFn,
        onSuccess: (res: IAuthMutationFnProps) => {
            toast.success(res.message)
            onClose()
            setFiles([])
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.ClassesList],
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
                <DButton type='submit' loading={isPending} leftSection={<IconUpload />}>
                    آپلود
                </DButton>
            </div>
        </form>
    )
}

export default AdminCreateClassUploadModal
