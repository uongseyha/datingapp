import { MemberEditComponent } from './../members/member-edit/member-edit.component';
import { Injectable, Component } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable()
export class PreventUnsavedChangeGuard implements CanDeactivate<MemberEditComponent>{
    canDeactivate(component: MemberEditComponent){
        if (component.editForm.dirty){
            return confirm("Are you sure? Your data will be lose!");
        }

        return true;
    }
}