import { AlertifyService } from './../_service/alertify.service';
import { AuthService } from './../_service/auth.service';
import { UserService } from './../_service/user.service';
import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { findIndex } from 'rxjs/operators';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(private userService: UserService, private authService: AuthService,
    private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    this.userService.getMessages(this.authService.decodeToken.nameid, this.pagination.currentPage,
      this.pagination.itemsPerPage, this.messageContainer)
      .subscribe((res: PaginatedResult<Message[]>) => {
        this.messages = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

  deleteMessage(id:number){
    this.alertify.confirm("Are you sure to delete this message?",()=>{
      this.userService.deleteMessage(id,this.authService.decodeToken.nameid).subscribe((res)=>{
        this.messages.splice(this.messages.findIndex(x => x.id===id),1);
        this.alertify.success("Message has been deleted");
      },err => this.alertify.error(err));
    })
  }
}
