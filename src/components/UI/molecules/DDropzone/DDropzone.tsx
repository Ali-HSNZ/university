import { type FC } from 'react'
import { toast } from 'react-toastify'
import { Dropzone, type FileWithPath } from '@mantine/dropzone'
import { IconUpload, IconX } from '@tabler/icons-react'

import { type TCriticalAny } from '@core/types/critical-any'

import { DPreviewFileCard, FileIcon, type IDDropzoneProps } from './resources'

const DDropzone: FC<IDDropzoneProps> = ({
    label = null,
    withAsterisk,
    cols = 1,
    handleUpload,
    files,
    setFiles,
    maxSize,
    removeFilesFromFormState,
    accept,
    ...rest
}) => {
    const removeFileHandler = (file: FileWithPath) => {
        setFiles((files) => {
            const filteredFiles = files.filter((singleFile) => singleFile !== file)

            if (removeFilesFromFormState) {
                removeFilesFromFormState('')
            }

            return filteredFiles
        })
    }

    const addFileHandler = (files: FileWithPath[]) => {
        setFiles(files)
        handleUpload(files)
    }

    return (
        <div className='relative flex flex-col gap-y-4'>
            <div className='flex flex-col gap-y-1'>
                {/* Rendering label based on certain conditions */}
                {label && (
                    <label className='text-sm bg-white text-dark font-medium'>
                        {label}
                        {withAsterisk && <span className='text-[#ff6b6b]'> *</span>}
                    </label>
                )}
                {/* Rendering mantine dropzone */}
                <Dropzone
                    className='h-full border border-blue-200 hover:border-blue-200 bg-blue-50 focus-within:border-blue-200 flex items-center justify-start p-6 duration-500 rounded-lg'
                    onDrop={addFileHandler}
                    maxSize={maxSize}
                    accept={accept}
                    onReject={(files: TCriticalAny[]) =>
                        files.forEach((file, index) =>
                            file.errors.forEach((error: TCriticalAny) => {
                                if (index === 0) toast.error(error.message)
                            })
                        )
                    }
                    {...rest}
                >
                    <div className='h-full flex flex-col items-start justify-center'>
                        <Dropzone.Accept>
                            <IconUpload size='2.7rem' stroke={1.5} className='text-blue-500' />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <IconX size='2.7rem' stroke={1.5} color='red' />
                        </Dropzone.Reject>
                        <div className='flex flex-row items-center gap-x-3'>
                            <div className='flex-shrink-0'>
                                <FileIcon />
                            </div>
                            <span className='text-black text-sm font-medium text-right'>
                                فایل ها را اینجا رها کنید یا برای آپلود کلیک کنید
                                <div className='text-gray-500 text-xs mt-2 font-regular'>
                                    فرمت های پذیرفته شده: {accept?.join(', ')} | حداکثر حجم فایل:{' '}
                                    {Intl.NumberFormat('en').format(Math.round(Number(maxSize) / 1000))}KB
                                </div>
                            </span>
                        </div>
                    </div>
                </Dropzone>
            </div>
            {/* Preview the files that selected */}
            {files.length > 0 && (
                <div
                    className={`grid gap-4 ${
                        cols === 1
                            ? 'grid-cols-1'
                            : cols === 2
                              ? 'grid-cols-1 md:grid-cols-2'
                              : cols === 3
                                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    }`}
                >
                    {files &&
                        files.map((file, index) => (
                            <DPreviewFileCard
                                key={index}
                                file={file}
                                removeFileHandler={() => removeFileHandler(file)}
                            />
                        ))}
                </div>
            )}
        </div>
    )
}

export default DDropzone
