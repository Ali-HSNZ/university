import { IconFileOff } from '@tabler/icons-react'

import { type IEmptyBoundaryProps } from './resources'

const EmptyBoundary = ({ title = 'داده‌ای برای نمایش وجود ندارد' }: IEmptyBoundaryProps) => {
    return (
        <div className={'flex items-center bg-white rounded-md p-6 justify-center gap-2 w-full h-full'}>
            <IconFileOff size='32' className='text-blue-700' />
            <span className='font-medium text-sm'>{title}</span>
        </div>
    )
}

export default EmptyBoundary
