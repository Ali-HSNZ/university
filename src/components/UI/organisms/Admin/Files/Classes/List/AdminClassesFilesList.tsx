import { useQuery } from '@tanstack/react-query'

import { EmptyBoundary } from '@partials/boundaries/EmptyBoundary'
import { DFetchingContainer } from '@partials/container/DFetchingContainer'

import { getAdminClassesFilesListFn } from '@api/get-admin-classes-files'

import { QueryKeys } from '@core/enums/query-keys'
import { type TFilesListFnType } from '@core/types/data/files-list'

import { AdminClassesFilesListTable } from './resources'

const AdminClassesFilesList = () => {
    const { isFetching, isError, isSuccess, data } = useQuery<TFilesListFnType[]>({
        queryKey: [QueryKeys.AdminClassesFiles],
        queryFn: () => getAdminClassesFilesListFn(),
    })

    return (
        <section className='flex flex-col gap-6'>
            <div className='w-full flex justify-between items-center'>
                <p>کلاس ها</p>
            </div>
            <DFetchingContainer
                isError={isError}
                isFetching={isFetching}
                isSuccess={isSuccess}
                emptyBoundary={data?.length === 0 && <EmptyBoundary />}
            >
                <AdminClassesFilesListTable data={data as TFilesListFnType[]} />
            </DFetchingContainer>
        </section>
    )
}

export default AdminClassesFilesList
