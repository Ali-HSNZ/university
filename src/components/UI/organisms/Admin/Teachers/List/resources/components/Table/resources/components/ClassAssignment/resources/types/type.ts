import { type TTeachersListFnType } from '@core/types/data/teachers-list'

interface IClassAssignmentProps {
    close: () => void
    rowDetail: TTeachersListFnType | undefined
}

export default IClassAssignmentProps
