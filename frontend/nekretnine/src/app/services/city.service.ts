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

  getAllRegions() {
    return this.http.get(this.uri+'/getAllRegions');
  }

  getAllMicrolocations() {
    return this.http.get(this.uri+'/getAllMicrolocations');
  }

  getAllCityRegions(city: string) {
    const data = {
      city: city 
    }

    return this.http.post(this.uri+'/getAllCityRegions', data);
  }

  getAllCityRegionMicroLocations(city_region: string) {
    const data = {
      city_region: city_region 
    }

    return this.http.post(this.uri+'/getAllCityRegionMicroLocations', data);
  }

}
