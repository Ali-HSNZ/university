const Routes = {
    Root: '/',
    AdminPanel: '/admin/',
    AdminManageTeachersList: 'teachers/',
    AdminTeacherProfile: (teacherCode: string) => Routes.AdminPanel + Routes.AdminManageTeachersList + teacherCode,
    AdminManageLessons: '/admin/lessons',
    AdminTeacherLessons: (teacherCode: string) =>
        Routes.AdminPanel + Routes.AdminManageTeachersList + teacherCode + '/classes',
}

export default Routes
