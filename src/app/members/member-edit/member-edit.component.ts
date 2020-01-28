import { UserService } from './../../_service/user.service';
import { AuthService } from './../../_service/auth.service';
import { AlertifyService } from './../../_service/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from './../../_models/user';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  user:User;
  photoUrl:string;
  
  @ViewChild('editForm',{static:true}) editForm:NgForm;
  @HostListener('window:beforeunload',['$event'])
  unloadNotification($event:any){
    if (this.editForm.dirty){
      $event.returnValue=true;
    }
  }

  constructor(
    private route:ActivatedRoute,
    private alertify: AlertifyService,
    private authService: AuthService,
    private userService:UserService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data) =>{
      this.user=data['user'];
    });

    this.authService.currentPhotoUrl.subscribe(res => this.photoUrl=res);
  }

  updateUser(){
    this.userService.updateUser(this.authService.decodeToken.nameid,this.user).subscribe(()=>{
      this.alertify.success("Save success!");
      this.editForm.reset(this.user);
    }, err => this.alertify.error(err))
  }

  updateMainPhoto(url:string){
    this.user.photoUrl=url;
  }
}
