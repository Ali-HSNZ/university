const Routes = {
    Root: '/',
    AdminPanel: '/admin/',
    AdminManageTeachersList: 'teachers/',
    AdminTeacherProfile: (teacherCode: number) => Routes.AdminPanel + Routes.AdminManageTeachersList + teacherCode,
    AdminManageLessons: '/admin/lessons',
    AdminTeacherLessons: (teacherCode: number) =>
        Routes.AdminPanel + Routes.AdminManageTeachersList + teacherCode + '/classes',
}

export default Routes
