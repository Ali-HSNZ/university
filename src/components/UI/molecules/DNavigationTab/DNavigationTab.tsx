import { type FC } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { type IDNavigationTabProps } from './resources'

const DNavigationTab: FC<IDNavigationTabProps> = ({ navigationItems }) => {
    // Getting last segment from the url for implementing active style
    const pathname = usePathname()

    // Rendering navigation items into the JSX
    const renderItems = () =>
        navigationItems.map((item, index) => (
            <Link key={index} href={item.href || ''} className='relative py-3 flex-shrink-0'>
                <span
                    className={`text-sm ${
                        pathname.endsWith(item.href) ? 'text-gray-800 font-semibold' : 'text-gray-500 font-medium'
                    }`}
                >
                    {item.title}
                </span>
                <div
                    className={`absolute bottom-0 left-0 w-full h-1 rounded-full ${
                        pathname.endsWith(item.href) ? 'bg-blue-500' : 'bg-transparent'
                    }`}
                ></div>
            </Link>
        ))

    return <div className='flex flex-row gap-8 overflow-x-auto'>{renderItems()}</div>
}

export default DNavigationTab
