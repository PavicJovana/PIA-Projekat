import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor(private http: HttpClient) { }
  
  uri = "http://localhost:4000/agencies";

  checkAgencyTaken(pib: string) {
    const data = {
      pib: pib
    }

    return this.http.post(this.uri+"/checkAgencyTaken", data);

  }

  addAgency(data: Object) {

    return this.http.post(this.uri+"/addAgency", data);

  }

  getAll() {

    return this.http.get(this.uri+"/getAll");
    
  }

  getAgency(pib: Object) {

    return this.http.post(this.uri+"/getAgency", {pib: pib});

  }
}
