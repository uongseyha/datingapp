import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_service/alertify.service';
import { UserService } from '../_service/user.service';
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberListResolver implements Resolve<User[]>{

    pageNumber=1;
    pageSize=5;
    constructor(
        private userService: UserService,
        private alertifyService:AlertifyService,
        private router: Router
    ){}

    resolve(): Observable<User[]> {
        return this.userService.getUsers(this.pageNumber,this.pageSize).pipe(
            catchError(err => {
                this.alertifyService.error('Problem retrieve data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    } 
}