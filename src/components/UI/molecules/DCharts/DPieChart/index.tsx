import dynamic from 'next/dynamic'

import { DLoading } from '@atoms/DLoading'

const DPieChart = dynamic(() => import('./DPieChart'), {
    ssr: false,
    loading: () => <DLoading />,
})
export { DPieChart }
