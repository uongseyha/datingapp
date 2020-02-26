import { AlertifyService } from './../../_service/alertify.service';
import { UserService } from './../../_service/user.service';
import { AuthService } from './../../_service/auth.service';
import { User } from './../../_models/user';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() user:User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertifyService:AlertifyService
  ) { }

  ngOnInit() {
  }

  sendLike(id:number){
    this.userService.sendLike(this.authService.decodeToken.nameid,id).subscribe(
      res=>{
        console.log(this.user.knownAs);
        console.log(id);
      this.alertifyService.success("You like successfuly " + this.user.knownAs);
      
    },err => {this.alertifyService.error(err)})
  }

}
