import { Product } from './../_models/product';
import { User } from './../_models/user';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl + 'user');
  }

  getUser(id): Observable<User>{
    return this.http.get<User>(this.baseUrl + 'user/' + id);
  }

  getProduct(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl + 'product');
  }

  updateUser(id:number,user:User){
    return this.http.put(this.baseUrl + 'user/' + id,user);
  }
}
