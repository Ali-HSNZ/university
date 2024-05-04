const Routes = {
    Root: '/',
    AdminPanel: '/admin/',
    AdminManageTeachersList: 'teachers/',
    AdminTeacherProfile: (code: number) => Routes.AdminPanel + Routes.AdminManageTeachersList + code,
}

export default Routes
