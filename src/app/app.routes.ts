import { Routes } from '@angular/router';
import { AuthenticatedGuard } from './auth/guards/authenticated.guard';
import { notAuthenticated } from './auth/guards/notauthenticated.guard';

export const routes: Routes = [
       {
        path:'auth',
        canMatch: [notAuthenticated],
        loadChildren:()=> import('./auth/auth.routes'),
    },
    {
        path: 'dashboard',
        canMatch: [AuthenticatedGuard],
        loadChildren:()=> import('./admin-dashboard/dashboard.routes'),
    },
    {
        path:'',
        loadChildren:()=> import('./front-page/front.routes'),
    },
];
