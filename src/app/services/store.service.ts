import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }
  
  getUsersList() {
    return JSON.parse(sessionStorage.getItem('users') || "a");
  }

  setUsersList(data: any) {
    sessionStorage.setItem('users', JSON.stringify(data));
  }
  
  getUser(id: number) {
    return JSON.parse(sessionStorage.getItem('users') || "a").find((user: any) => user.id === id);
  }

  setUser(data: any) {
    let users = JSON.parse(sessionStorage.getItem('users') || "a");
    let index = users.findIndex((user: any) => user.id === data.id);
    users[index] = data;
    sessionStorage.setItem('users', JSON.stringify(users));
  }

  deleteUser(id: number) {
    let users = JSON.parse(sessionStorage.getItem('users') || "a");
    let index = users.findIndex((user: any) => user.id === id);
    users.splice(index, 1);
    sessionStorage.setItem('users', JSON.stringify(users));
  }

  addUser(data: any) {
    let users = JSON.parse(sessionStorage.getItem('users') || "a");
    users.push(data);
    sessionStorage.setItem('users', JSON.stringify(users));
  }

}
