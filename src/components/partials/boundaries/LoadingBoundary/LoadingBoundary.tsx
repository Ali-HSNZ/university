import { DLoading } from '@atoms/DLoading'

import { cn } from '@core/utils/common/cn'

import { type ILoadingBoundaryProps } from './resources'

const LoadingBoundary = ({ className = '', text = '' }: ILoadingBoundaryProps) => {
    return (
        <div className={cn('flex flex-col items-center justify-center gap-y-2 w-full h-full p-4', className)}>
            <DLoading />
            <span className='font-semibold text-sm md:text-base text-neutral'>{text}</span>
        </div>
    )
}

export default LoadingBoundary
