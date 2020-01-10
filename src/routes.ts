import { MessagesComponent } from './app/messages/messages.component';
import { ListsComponent } from './app/lists/lists.component';
import { MemberListsComponent } from './app/member-lists/member-lists.component';
import { HomeComponent } from './app/home/home.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './app/_guards/auth.guard';

export const appRoutes: Routes = [
    {path:'home',component:HomeComponent},
    {
        path:'',
        runGuardsAndResolvers:'always',
        canActivate:[AuthGuard],
        children:[
            {path:'members',component:MemberListsComponent},
            {path:'lists',component:ListsComponent},
            {path:'messages',component:MessagesComponent}
        ]
    },
    {path:'**',redirectTo:'home',pathMatch:'full'}
];