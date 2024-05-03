import dynamic from 'next/dynamic'

import { DLoading } from '@atoms/DLoading'

const DClusterMap = dynamic(() => import('./DClusterMap'), {
    ssr: false,
    loading: () => <DLoading />,
})
export { DClusterMap }
