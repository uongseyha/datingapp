import { AuthService } from './../_service/auth.service';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_service/alertify.service';
import { UserService } from '../_service/user.service';
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberEditResolver implements Resolve<User>{

    constructor(
        private userService: UserService,
        private alertifyService:AlertifyService,
        private router: Router,
        private authService:AuthService
    ){}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(this.authService.decodeToken.nameid).pipe(
            catchError(err => {
                this.alertifyService.error('Problem retrieve data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    } 
}