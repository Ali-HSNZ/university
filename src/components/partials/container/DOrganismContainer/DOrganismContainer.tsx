import { type FC } from 'react'

import { type IOrganismContainerProps } from './resources'

const DOrganismContainer: FC<IOrganismContainerProps> = ({ children, className = '' }) => {
    return <section className={`w-full p-3 sm:p-5 rounded-xl bg-white ${className}`}>{children}</section>
}

export default DOrganismContainer
