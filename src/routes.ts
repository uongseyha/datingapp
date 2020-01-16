import { MemberListResolver } from './app/_resolver/member-list.resolver';
import { MemberDetailResolver } from './app/_resolver/member-detail.resolver';
import { MemberDetailComponent } from './app/members/member-detail/member-detail.component';
import { MessagesComponent } from './app/messages/messages.component';
import { ListsComponent } from './app/lists/lists.component';
import { MemberListsComponent } from './app/members/member-lists/member-lists.component';
import { HomeComponent } from './app/home/home.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './app/_guards/auth.guard';

export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'members', component: MemberListsComponent, resolve:{users:MemberListResolver}},
            {path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
            {path: 'lists', component: ListsComponent},
            {path: 'messages', component: MessagesComponent}
        ]
    },
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];