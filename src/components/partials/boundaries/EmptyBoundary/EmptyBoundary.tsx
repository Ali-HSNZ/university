import { ReceiptLong } from '@mui/icons-material'

import { cn } from '@core/utils/common/cn'

import { type IEmptyBoundaryProps } from './resources'

const EmptyBoundary = ({
    icon = <ReceiptLong />,
    title = 'داده‌ای برای نمایش وجود ندارد',
    description,
    className = '',
}: IEmptyBoundaryProps) => {
    return (
        <div
            className={cn('flex flex-col justify-center h-full items-center text-center gap-2.5 pt-6 pb-2', className)}
        >
            <div className='p-1 rounded-full border border-blue-100'>
                <div className='w-12 h-12 bg-blue-100 text-blue-700 flex items-center justify-center rounded-full'>
                    {icon}
                </div>
            </div>
            <div className='text-neutral-900'>{title}</div>
            {description && <div className='text-neutral-500'>{description}</div>}
        </div>
    )
}

export default EmptyBoundary
