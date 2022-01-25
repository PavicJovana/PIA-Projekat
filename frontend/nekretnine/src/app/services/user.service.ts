import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/users";

  login(username: string, password: string) {
    const data = {
      username: username,
      password: password
    }

    return this.http.post(this.uri+"/login", data);

  }

  register(data: Object) {

    return this.http.post(this.uri+"/register", data);

  }

  checkUserDataTaken(username: string, email: string, licence_number: string) {

    const data = {
      username: username,
      email: email,
      licence_number: licence_number
    }

    return this.http.post(this.uri+"/checkUserData", data);

  }

  getAllPendingUsers() {
    return this.http.get(this.uri+"/getAllPendingUsers");
  }

  getAllUsers() {
    return this.http.get(this.uri+"/getAllUsers");
  }

  approveUser(username: string) {
    const data = {
      username: username
    }

    return this.http.post(this.uri+"/approveUser", data);
  }

  rejectUser(username: string) {
    const data = {
      username: username
    }

    return this.http.post(this.uri+"/rejectUser", data);
  }

}
