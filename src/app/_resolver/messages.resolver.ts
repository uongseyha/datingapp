import { AuthService } from './../_service/auth.service';
import { Message } from './../_models/message';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_service/alertify.service';
import { UserService } from '../_service/user.service';
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MessagesResolver implements Resolve<Message[]>{

    pageNumber=1;
    pageSize=5;
    messageContainer='Unread';

    constructor(
        private authService:AuthService,
        private userService: UserService,
        private alertifyService:AlertifyService,
        private router: Router
    ){}

    resolve(): Observable<Message[]> {
        return this.userService.getMessages(this.authService.decodeToken.nameid,this.pageNumber,this.pageSize,this.messageContainer).pipe(
            catchError(err => {
                this.alertifyService.error('Problem retrieve messages');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    } 
}