import { type FC, type PropsWithChildren } from 'react'

const DTemplateContainer: FC<PropsWithChildren> = ({ children }) => {
    return <section className='w-full h-fit p-4 sm:p-8 flex flex-col gap-y-4 sm:gap-y-8'>{children}</section>
}

export default DTemplateContainer
