import dynamic from 'next/dynamic'

import { DLoading } from '@atoms/DLoading'

const DBarChart = dynamic(() => import('./DBarChart'), {
    ssr: false,
    loading: () => <DLoading />,
})
export { DBarChart }
