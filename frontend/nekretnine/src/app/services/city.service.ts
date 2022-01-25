import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/cities";

  getAll() {
    return this.http.get(this.uri+"/getAll");
  }

}
