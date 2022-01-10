import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000";

  login(username: string, password: string) {
    const data = {
      username: username,
      password: password
    }

    return this.http.post(this.uri+"/users/login", data);

  }

  register(data: Object) {

    return this.http.post(this.uri+"/users/register", data);

  }

  checkUsernameAndEmailTaken(username: string, email: string) {

    const data = {
      username: username,
      email: email
    }

    return this.http.post(this.uri+"/users/checkUsernameAndEmail", data);

  }
}
