const Routes = {
    Root: '/',
    AdminPanel: '/admin/',
    AdminManageTeachersList: 'teachers/',
    AdminTeacherProfile: (teacherCode: number) => Routes.AdminPanel + Routes.AdminManageTeachersList + teacherCode,
    AdminTeacherLessons: (teacherCode: number) =>
        Routes.AdminPanel + Routes.AdminManageTeachersList + teacherCode + '/lessons',
}

export default Routes
