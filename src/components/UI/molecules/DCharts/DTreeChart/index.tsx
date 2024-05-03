import dynamic from 'next/dynamic'

import { DLoading } from '@atoms/DLoading'

const DTreeChart = dynamic(() => import('./DTreeChart'), {
    ssr: false,
    loading: () => <DLoading />,
})
export { DTreeChart }
