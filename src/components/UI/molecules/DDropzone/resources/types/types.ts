import { type Dispatch, type SetStateAction } from 'react'
import { type DropzoneProps, type FileWithPath } from '@mantine/dropzone'

interface IDDropzoneProps extends Partial<DropzoneProps> {
    label?: string
    withAsterisk?: boolean
    cols?: 1 | 2 | 3 | 4
    description?: string
    handleUpload: (files: FileWithPath[]) => void
    files: FileWithPath[]
    maxSize?: number
    accept?: string[]
    removeFilesFromFormState?: (arg: string) => void
    setFiles: Dispatch<SetStateAction<FileWithPath[]>>
}

export default IDDropzoneProps
