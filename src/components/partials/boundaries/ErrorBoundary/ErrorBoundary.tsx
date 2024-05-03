import { IconAlertOctagon } from '@tabler/icons-react'

import { cn } from '@core/utils/common/cn'

import { type IErrorBoundaryProps } from './resources'

const ErrorBoundary = ({ className = '', text = 'برقراری ارتباط با مشکل مواجه شد', icon }: IErrorBoundaryProps) => {
    return (
        <div className={cn('flex flex-col items-center justify-center gap-y-2 w-full h-full', className)}>
            {icon || <IconAlertOctagon size='32' className='text-error' />}
            <span className='font-semibold text-sm md:text-base text-typography'>{text}</span>
        </div>
    )
}

export default ErrorBoundary
