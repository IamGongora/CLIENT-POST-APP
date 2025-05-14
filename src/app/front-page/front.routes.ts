import { Routes } from "@angular/router";
import { FrontLayoutComponent } from "./layouts/front-layout/front-layout.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";

const frontRoutes: Routes = [
    {
        path:'',
        component: FrontLayoutComponent,
        children:[
            {
                path:'',
                component: HomePageComponent

            },
            {
                path:'**',
                loadComponent:()=>import('./pages/not-found-page/not-found-page.component'),
            }
        ]
    }
]
export default frontRoutes;