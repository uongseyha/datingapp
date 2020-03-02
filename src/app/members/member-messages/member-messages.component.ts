import { AlertifyService } from './../../_service/alertify.service';
import { UserService } from './../../_service/user.service';
import { AuthService } from './../../_service/auth.service';
import { Message } from './../../_models/message';
import { Component, OnInit, Input } from '@angular/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  @Input() recipientId:number;
  messages:Message[];
  newMessage: any={};

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertifyService: AlertifyService,
  ) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages(){
    const userId=+this.authService.decodeToken.nameid;
    this.userService.getMessagesThread(this.authService.decodeToken.nameid,this.recipientId)
    .pipe(
      tap(messages => {
        for(let i=0;i<messages.length;i++){
          if (messages[i].isRead===false && messages[i].recipientId===userId){
            this.userService.markAsRead(messages[i].id,userId);
          }
        }
      })
    )
    .subscribe(res =>{
      this.messages=res;
    }, err => this.alertifyService.error(err));
  }

  sendMessage(){
    this.newMessage.recipientId=this.recipientId;
    this.userService.sendMessage(this.authService.decodeToken.nameid,this.newMessage).subscribe((data: Message) =>{
      this.messages.unshift(data);
      this.newMessage.content='';
    },
    err => this.alertifyService.error(err))
  }
}
