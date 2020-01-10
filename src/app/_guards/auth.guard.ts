import { AlertifyService } from './../_service/alertify.service';
import { AuthService } from './../_service/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService:AuthService,
    private router:Router,
    private alertityService: AlertifyService
  ){}

  canActivate(): boolean{

    if (this.authService.LoggedIn()){
      return true;
    }

    this.alertityService.error('Not allow to pass url');
    this.router.navigate(['/home']);
    return false;
  }
  
  
}
