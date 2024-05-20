import { type FC } from 'react'
import { IconTrash } from '@tabler/icons-react'
import { IconFile } from '@tabler/icons-react'

import { DActionIcon } from '@atoms/DActionIcon'

import { type IDPreviewFileCardProps } from './resources'

const DPreviewFileCard: FC<IDPreviewFileCardProps> = ({ file, removeFileHandler }) => {
    return (
        <div className='flex items-center justify-between p-3 border border-[#DDDDDD] rounded-lg'>
            <div className='flex flex-row items-center gap-3'>
                <IconFile />
                <div className='flex flex-col flex-wrap gap-1'>
                    <span className='text-sm text-gray-700 font-medium'>{file.name}</span>
                    <div className='text-sm flex gap-x-0.5 text-gray-700 font-iran-yekan'>
                        <p>KB</p>
                        <p>{Math.round(file.size / 1000).toLocaleString()}</p>
                    </div>
                </div>
            </div>
            <div className='flex items-center'>
                <DActionIcon variant='transparent' className='text-red-500' onClick={removeFileHandler}>
                    <IconTrash />
                </DActionIcon>
            </div>
        </div>
    )
}

export default DPreviewFileCard
