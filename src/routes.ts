import { MemberEditResolver } from './app/_resolver/member-edit.resolver';
import { MemberEditComponent } from './app/members/member-edit/member-edit.component';
import { MemberListResolver } from './app/_resolver/member-list.resolver';
import { MemberDetailResolver } from './app/_resolver/member-detail.resolver';
import { MemberDetailComponent } from './app/members/member-detail/member-detail.component';
import { MessagesComponent } from './app/messages/messages.component';
import { ListsComponent } from './app/lists/lists.component';
import { MemberListsComponent } from './app/members/member-lists/member-lists.component';
import { HomeComponent } from './app/home/home.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './app/_guards/auth.guard';
import { PreventUnsavedChangeGuard } from './app/_guards/prevent-unsaved-change.guard';
import { ListsResolver } from './app/_resolver/lists.resolver';

export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'members', component: MemberListsComponent, resolve:{users:MemberListResolver}},
            {path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
            {path: 'member/edit', 
                component: MemberEditComponent, 
                resolve: {user: MemberEditResolver},
                canDeactivate:[PreventUnsavedChangeGuard]
            },
            {path: 'lists', component: ListsComponent, resolve: {users: ListsResolver}},
            {path: 'messages', component: MessagesComponent}
        ]
    },
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];