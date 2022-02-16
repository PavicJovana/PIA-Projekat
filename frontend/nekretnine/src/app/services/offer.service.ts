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

  getAllMicrolocationType(microlocation: string, type: string) {
    const data = {
      microlocation: microlocation,
      type: type
    };

    return this.http.post(this.uri+"/getAllMicrolocationType", data);
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

  addOfferImage(id: number, image: string) {
    const data = {
      id: id,
      image: image
    }

    return this.http.post(this.uri+"/addImage", data);
  }
}
