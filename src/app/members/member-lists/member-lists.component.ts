import { User } from './../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_service/alertify.service';
import { UserService } from '../../_service/user.service';
import { Product } from '../../_models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-lists',
  templateUrl: './member-lists.component.html',
  styleUrls: ['./member-lists.component.css']
})
export class MemberListsComponent implements OnInit {

  users: User[];
  products: Product[];

  constructor(
    private userService:UserService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    //this.loadProducts();
    //this.loadUsers();
    this.route.data.subscribe((data: User[])=>{
      this.users=data['users'];
    })
  }

  loadUsers(){
    this.userService.getUsers().subscribe((res:User[]) => {
      this.users=res;
    },err => {
      this.alertifyService.error(err);
    });
  }

  loadProducts(){
    this.userService.getProduct().subscribe((res:Product[]) => {
      this.products=res;
    },err => {
      this.alertifyService.error(err);
    });
  }


}
