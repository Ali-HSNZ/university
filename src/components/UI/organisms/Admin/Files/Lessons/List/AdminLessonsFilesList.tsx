import { useQuery } from '@tanstack/react-query'

import { EmptyBoundary } from '@partials/boundaries/EmptyBoundary'
import { DFetchingContainer } from '@partials/container/DFetchingContainer'

import { getAdminLessonsFilesListFn } from '@api/get-admin-lessons-files'

import { QueryKeys } from '@core/enums/query-keys'
import { type TFilesListFnType } from '@core/types/data/files-list'

import { AdminLessonsFilesListTable } from './resources'

const AdminLessonsFilesList = () => {
    const { isFetching, isError, isSuccess, data } = useQuery<TFilesListFnType[]>({
        queryKey: [QueryKeys.AdminLessonsFiles],
        queryFn: () => getAdminLessonsFilesListFn(),
    })

    return (
        <section className='flex flex-col gap-6'>
            <div className='w-full flex justify-between items-center'>
                <p>لیست فایل های دروس</p>
            </div>
            <DFetchingContainer
                isError={isError}
                isFetching={isFetching}
                isSuccess={isSuccess}
                emptyBoundary={data?.length === 0 && <EmptyBoundary />}
            >
                <AdminLessonsFilesListTable data={data as TFilesListFnType[]} />
            </DFetchingContainer>
        </section>
    )
}

export default AdminLessonsFilesList
