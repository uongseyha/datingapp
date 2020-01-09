import { AlertifyService } from './../_service/alertify.service';
import { AuthService } from './../_service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(
    public authService: AuthService,
    private alertifyService: AlertifyService
    ) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe( next => {
      this.alertifyService.success('login success!');
    }, error => {
      this.alertifyService.error('login fail');
    });
  }

  loggedIn(){
    // const token=localStorage.getItem('token');
    // return !!token;

    return this.authService.LoggedIn();
  }

  logout(){
    localStorage.removeItem('token');
  }
}
