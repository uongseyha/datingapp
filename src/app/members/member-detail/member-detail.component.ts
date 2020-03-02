import { AlertifyService } from './../../_service/alertify.service';
import { UserService } from './../../_service/user.service';
import { User } from './../../_models/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs',{static:true}) memberTabs: TabsetComponent;
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.loadUser();
    this.route.data.subscribe((data) => {
      this.user = data['user'];
    });

    this.route.queryParams.subscribe((data) => {
      const selectTab=data['tab'];
      this.memberTabs.tabs[selectTab>0?selectTab:0].active=true;
    })

    this.galleryOptions = [
      {
          width: '500px',
          height: '500px',
          imagePercent: 100,
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
          preview:false
      }
    ];

    this.galleryImages=this.getImages();
  }

  // loadUser(){
  //   this.userService.getUser(this.route.snapshot.params['id']).subscribe((res)=>{
  //     this.user=res;
  //   },err => this.alertifyService.error(err))
  // }

  getImages(){
    const imageUrls= [];
    for (const img of this.user.photos) {
      imageUrls.push({
        small: img.url,
        medium: img.url,
        big:img.url,
        description:img.description
      });
    }

    return imageUrls;
  }

  selectTab(tabId: number){
    this.memberTabs.tabs[tabId].active=true;
  }
}
