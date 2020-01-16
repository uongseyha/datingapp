import { Observable, of } from 'rxjs';
import { AlertifyService } from './../_service/alertify.service';
import { UserService } from './../_service/user.service';
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberDetailResolver implements Resolve<User>{

    constructor(
        private userService: UserService,
        private alertifyService:AlertifyService,
        private router: Router
    ){}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(route.params['id']).pipe(
            catchError(err => {
                this.alertifyService.error('Problem retrieve data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    } 
}