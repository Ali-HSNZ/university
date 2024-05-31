import { useQuery } from '@tanstack/react-query'

import { EmptyBoundary } from '@partials/boundaries/EmptyBoundary'
import { DFetchingContainer } from '@partials/container/DFetchingContainer'

import { getAdminPendingToAgreeListFn } from '@api/admin-pending-to-agree'

import { QueryKeys } from '@core/enums/query-keys'
import { type TFilesListFnType } from '@core/types/data/files-list'

import { AdminPendingToAgreeFilesListTable } from './resources'

const AdminPendingToAgreeFilesList = () => {
    const { isFetching, isError, isSuccess, data } = useQuery<TFilesListFnType[]>({
        queryKey: [QueryKeys.AdminPendingToAgreeFiles],
        queryFn: () => getAdminPendingToAgreeListFn(),
    })

    return (
        <section className='flex flex-col gap-6'>
            <div className='w-full flex justify-between items-center'>
                <p>در انتظار تایید</p>
            </div>
            <DFetchingContainer
                isError={isError}
                isFetching={isFetching}
                isSuccess={isSuccess}
                emptyBoundary={data?.length === 0 && <EmptyBoundary />}
            >
                <AdminPendingToAgreeFilesListTable data={data as TFilesListFnType[]} />
            </DFetchingContainer>
        </section>
    )
}

export default AdminPendingToAgreeFilesList
