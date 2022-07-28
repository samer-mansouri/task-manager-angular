import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from '../model/User';
import { UpdateUserResp } from '../model/UpdateUserResp';
@Injectable({
  providedIn: 'root'
})


export class DataService {

  API_URL : string = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  logIn(data: any) {
    //post data
    return this.http.post(`${this.API_URL}/login`, data, 
    { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) })  
    .pipe(catchError((err) => {
      console.log(err);
      return throwError(err);
    }));
  }


  getUsersList() {
    return this.http.get<User[]>(`${this.API_URL}/users`)
    .pipe(catchError((err) => {
      console.log(err);
      return throwError(err);
    }));
  }

  createUser(data: any) {
    return this.http.post(`${this.API_URL}/register`, data)
    .pipe(catchError((err) => {
      console.log(err);
      return throwError(err);
    }));
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.API_URL}/user/${id}`)
    .pipe(catchError((err) => {
      console.log(err);
      return throwError(err);
    }));
  }

  updateUser(data: any) {
    return this.http.put<UpdateUserResp>(`${this.API_URL}/user`, data)
    .pipe(catchError((err) => {
      console.log(err);
      return throwError(err);
    }));
  }

  getUser() {
    let id = JSON.parse(localStorage.getItem('user') || "a").id;
    return this.http.get<User>(`${this.API_URL}/user/${id}`)
    .pipe(catchError((err) => {
      console.log(err);
      return throwError(err);
    }));
  }

  updateUserPassword(data: any) {
    let dataToSend = new URLSearchParams(data);
    return this.http.post(`${this.API_URL}/update_password`, dataToSend,
    
    { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) } 
    )
    .pipe(catchError((err) => {
      console.log(err);
      return throwError(err);
    }));
  }
}
