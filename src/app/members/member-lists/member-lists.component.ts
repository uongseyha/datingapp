import { Pagination, PaginatedResult } from './../../_models/pagination';
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
  user: User=JSON.parse(localStorage.getItem('user'));
  genderList=[{value: 'male', display:'Males'},{value:'female',display:'Females'}];
  userParams:any={};

  products: Product[];
  pagination: Pagination;

  constructor(
    private userService:UserService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    //this.loadProducts();
    //this.loadUsers();
    this.route.data.subscribe((data: User[])=>{
      this.users=data['users'].result;
      this.pagination=data['users'].pagination;
    })

    this.userParams.gender=this.user.gender==="female"?"male":"female";
    this.userParams.minAge=18;
    this.userParams.maxAge=90;
    this.userParams.orderBy="lastActive";
  }

  resetFilter(){
    this.userParams.gender=this.user.gender==="female"?"male":"female";
    this.userParams.minAge=18;
    this.userParams.maxAge=90;
    this.loadUsers();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers(){
    //console.log(this.userParams.orderBy);
    this.userService.getUsers(this.pagination.currentPage,this.pagination.itemsPerPage,this.userParams)
    .subscribe((res: PaginatedResult<User[]>) => {
      this.users=res.result;
      this.pagination=res.pagination;
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
