import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }
  
  uri = "http://localhost:4000/offers";

  getAll() {
    return this.http.get(this.uri+"/getAll");
  }

  
  getAllAgentsOffers(agent: string) {
    const data = {
      agent: agent
    };

    return this.http.post(this.uri+"/getAllAgentsOffers", data);
  }

  sellOffer(id: number) {
    const data = {
      id: id
    }

    return this.http.post(this.uri + "/sellRealestate", data);
  }

  addOffer(data: Object) {
    return this.http.post(this.uri+"/addRealestate", data);
  }
}
