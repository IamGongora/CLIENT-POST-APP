import { Routes } from "@angular/router";
import { DashboardLayoutComponent } from "./layout/dashboard-layout/dashboard-layout.component";
import { UsersPageComponent } from "./pages/users-page/users-page.component";
import { UserPageComponent } from "./pages/user-page/user-page.component";


const dashboardRoutes: Routes = [
    {
        path:'',
        component: DashboardLayoutComponent,
        children:[
            {
                path:'user',
                component: UsersPageComponent,
            },
            {
                path: 'users/:id',
                component: UserPageComponent,
            },
            {
                path: '**',
                redirectTo:'users',
            },
        ],
    },
    {
        path:'**',
        redirectTo:'',
    },
];
export default dashboardRoutes;
