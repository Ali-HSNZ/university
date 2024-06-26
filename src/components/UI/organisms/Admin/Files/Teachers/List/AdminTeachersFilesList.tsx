import { useQuery } from '@tanstack/react-query'

import { EmptyBoundary } from '@partials/boundaries/EmptyBoundary'
import { DFetchingContainer } from '@partials/container/DFetchingContainer'

import { getAdminTeachersFilesListFn } from '@api/get-admin-teachers-files'

import { QueryKeys } from '@core/enums/query-keys'
import { type TFilesListFnType } from '@core/types/data/files-list'

import { AdminTeachersFilesListTable } from './resources'

const AdminTeachersFilesList = () => {
    const { isFetching, isError, isSuccess, data } = useQuery<TFilesListFnType[]>({
        queryKey: [QueryKeys.AdminTeacherFiles],
        queryFn: () => getAdminTeachersFilesListFn(),
    })

    return (
        <section className='flex flex-col gap-6'>
            <div className='w-full flex justify-between items-center'>
                <p>اساتید</p>
            </div>
            <DFetchingContainer
                isError={isError}
                isFetching={isFetching}
                isSuccess={isSuccess}
                emptyBoundary={data?.length === 0 && <EmptyBoundary />}
            >
                <AdminTeachersFilesListTable data={data as TFilesListFnType[]} />
            </DFetchingContainer>
        </section>
    )
}

export default AdminTeachersFilesList
