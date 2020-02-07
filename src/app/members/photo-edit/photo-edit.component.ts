import { AlertifyService } from './../../_service/alertify.service';
import { UserService } from './../../_service/user.service';
import { AuthService } from './../../_service/auth.service';
import { environment } from './../../../environments/environment';
import { Photo } from './../../_models/photo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.css']
})
export class PhotoEditComponent implements OnInit {

  @Input() photos: Photo[];
  @Output() getMemberPhotoChange =new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain: Photo;

  constructor(
    private authService:AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodeToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
        if (photo.isMain){
          this.authService.changeMemberUrl(photo.url);
          this.authService.currentUser.photoUrl=photo.url;
          localStorage.setItem('user',JSON.stringify(this.authService.currentUser));
        }
      }
    };
  }

  updateMainPhoto(photo:Photo){
    this.userService.setMainPhoto(this.authService.decodeToken.nameid,photo.id).subscribe(
      res => {
        this.currentMain=this.photos.filter( x => x.isMain)[0];
        this.currentMain.isMain=false;
        photo.isMain=true;
        //this.getMemberPhotoChange.emit(photo.url);
        this.authService.changeMemberUrl(photo.url);
        this.authService.currentUser.photoUrl=photo.url;
        localStorage.setItem('user',JSON.stringify(this.authService.currentUser));

        this.alertify.success("Success update main photo");
      }, err => {
        this.alertify.error(err);
      }
    )
  }

  deletePhoto(photoId:number){
    this.alertify.confirm('Are you sure you want to delete this photo?', () =>{
      this.userService.deletePhoto(this.authService.decodeToken.nameid,photoId).subscribe(()=>{
        this.photos.splice(this.photos.findIndex(p => p.id===photoId));
        this.alertify.success("Photo has been delete");
      },err => this.alertify.error(err));
    });
  }
}
