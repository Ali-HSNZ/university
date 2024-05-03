import { type FC } from 'react'
import { IconTrash } from '@tabler/icons-react'

import { DActionIcon } from '@atoms/DActionIcon'
import { DImage } from '@atoms/DImage'

import { type IDPreviewFileCardProps } from './resources'

const DPreviewFileCard: FC<IDPreviewFileCardProps> = ({ file, removeFileHandler }) => {
    return (
        <div className='flex items-center justify-between py-2 px-4 border border-[#DDDDDD] rounded-lg'>
            <div className='flex flex-row items-center gap-3'>
                <DImage
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    width={48}
                    height={48}
                    className='object-fill'
                />
                <div className='flex flex-row flex-wrap gap-3'>
                    <span className='text-sm text-gray-700 font-medium'>{file.name}</span>
                    <span className='text-xs text-gray-500 font-medium pt-1'>
                        {Math.round(file.size / 1000).toLocaleString()} kb
                    </span>
                </div>
            </div>
            <div className='pl-4'>
                <DActionIcon className='group hover:bg-transparent p-0' onClick={removeFileHandler}>
                    <IconTrash className='group-hover:text-danger-200' />
                </DActionIcon>
            </div>
        </div>
    )
}

export default DPreviewFileCard
