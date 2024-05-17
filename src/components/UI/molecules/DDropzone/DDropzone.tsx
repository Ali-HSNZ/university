import { type FC } from 'react'
import { toast } from 'react-toastify'
import { Dropzone, type FileWithPath } from '@mantine/dropzone'
import { IconUpload, IconX } from '@tabler/icons-react'

import { type TCriticalAny } from '@core/types/critical-any'

import { DPreviewFileCard, FileIcon, type IDDropzoneProps } from './resources'

const DDropzone: FC<IDDropzoneProps> = ({
    label = null,
    withAsterisk,
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
                    className='h-full border cursor-pointer border-blue-200 hover:border-blue-200 bg-blue-50 focus-within:border-blue-200 flex items-center justify-start p-6 transition-all duration-500 rounded-lg'
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
                    <div className='h-full duration-500 transition-all flex flex-col items-start justify-center'>
                        <Dropzone.Accept>
                            <div className='w-full mb-6 p-4 rounded-lg bg-blue-100 border border-blue-300 flex justify-center items-center'>
                                <IconUpload size='2rem' stroke={1.5} className='text-blue-700' />
                            </div>
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <div className='w-full mb-6 p-4 rounded-lg gap-2 bg-red-100 border border-red-300 flex justify-center items-center'>
                                <IconX size='2rem' stroke={1.5} color='red' />
                                <p className='text-sm text text-red-600 font-semibold'>فایل مورد پذیرش نیست</p>
                            </div>
                        </Dropzone.Reject>
                        <div className='flex flex-row select-none items-center gap-x-3'>
                            <div className='shrink-0'>
                                <FileIcon />
                            </div>
                            <span className='text-black text-sm font-medium text-right'>
                                فایل ها را اینجا رها کنید یا برای آپلود کلیک کنید
                                <div className='text-gray-500 text-xs mt-2 leading-6 font-regular'>
                                    فرمت های پذیرفته شده: {accept?.join(', ')}
                                </div>
                                <div className='text-gray-500 text-xs mt-2 leading-6 flex gap-1 font-regular'>
                                    <p> حداکثر حجم فایل:</p>
                                    <div className='flex gap-0.5'>
                                        KB
                                        <p>{Intl.NumberFormat('en').format(Math.round(Number(maxSize) / 1000))}</p>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                </Dropzone>
            </div>
            {/* Preview the files that selected */}
            {files.length > 0 && (
                <div className={``}>
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
