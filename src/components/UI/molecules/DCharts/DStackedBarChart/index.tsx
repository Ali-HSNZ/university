import dynamic from 'next/dynamic'

import { DLoading } from '@atoms/DLoading'

const DStackedBarChart = dynamic(() => import('./DStackedBarChart'), {
    ssr: false,
    loading: () => <DLoading />,
})
export { DStackedBarChart }
