import dynamic from 'next/dynamic'

import { DLoading } from '@atoms/DLoading'

const DAreaChart = dynamic(() => import('./DAreaChart'), {
    ssr: false,
    loading: () => <DLoading />,
})
export { DAreaChart }
