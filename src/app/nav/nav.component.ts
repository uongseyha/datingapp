import { AlertifyService } from './../_service/alertify.service';
import { AuthService } from './../_service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  photoUrl:string;

  constructor(
    public authService: AuthService,
    private alertifyService: AlertifyService,
    private router:Router
    ) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(res => this.photoUrl=res);
  }

  login() {
    this.authService.login(this.model).subscribe( next => {
      this.alertifyService.success('login success!');
    }, error => {
      this.alertifyService.error('login fail');
    },()=>{
      this.router.navigate(['/members']);
    });
  }

  loggedIn(){
    // const token=localStorage.getItem('token');
    // return !!token;

    return this.authService.LoggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodeToken=null;
    this.authService.currentUser=null;
    this.alertifyService.message("Log out success");
    this.router.navigate(['/home']);
  }
}
