import { map } from 'rxjs/operators';
import { PaginatedResult } from './../_models/pagination';
import { Product } from './../_models/product';
import { User } from './../_models/user';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization:': 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // getUsers(): Observable<User[]>{
  //   return this.http.get<User[]>(this.baseUrl + 'users');
  // }

  getUsers(page?,itemsPerPage?,userParams?): Observable<PaginatedResult<User[]>>{
    const paginatedResult: PaginatedResult<User[]> =new PaginatedResult<User[]>();
    let params=new HttpParams();

    if (page!=null && itemsPerPage!=null){
      params= params.append('pageNumber',page);
      params=params.append('pageSize',itemsPerPage);
    }

    if (userParams!=null){
      params=params.append('minAge',userParams.minAge);
      params=params.append('maxAge',userParams.maxAge);
      params=params.append('gender',userParams.gender);
      params=params.append('orderBy',userParams.orderBy);
    }

    return this.http.get<User[]>(this.baseUrl + 'users',{observe: 'response',params}).pipe(
      map(res => {
        paginatedResult.result=res.body;
        if (res.headers.get('Pagination')!=null){
          paginatedResult.pagination=JSON.parse(res.headers.get('Pagination'));
        }

        return paginatedResult;
      })
    );
  }

  getUser(id): Observable<User>{
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  getProduct(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl + 'product');
  }

  updateUser(id:number,user:User){
    return this.http.put(this.baseUrl + 'users/' + id,user);
  }

  setMainPhoto(userId:number,photoId:number){
    return this.http.post(this.baseUrl + "users/" + userId + "/photos/" + photoId + "/setMain",{});
  }

  deletePhoto(userId:number,photoId:number){
    return this.http.delete(this.baseUrl + "users/" + userId + "/photos/" + photoId);
  }
  
}
