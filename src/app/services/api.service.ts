import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  getRegisteredUser() {
    throw new Error('Method not implemented.');
  }
  private baseUrl: string = "http://localhost:3000/enquiry"
  constructor(private http: HttpClient) { }
  postRegistration(registerObj: User) {
    return this.http.post<User>(`${this.baseUrl}`, registerObj)
  }
  getRegistedUser() {
    return this.http.get<User[]>(`${this.baseUrl}`)
  }
  updateRegisterUser(registerObj: User, id:number) {
    return this.http.put<User>(`${this.baseUrl}`, registerObj)
  }
  deleteRegistered(id:number) {
    return this.http.delete<User>(`${this.baseUrl}/${id}`)
  }
  getRegisteredUserId(id:number) {
    return this.http.get<User>(`${this.baseUrl}/${id}`)
  }
}
