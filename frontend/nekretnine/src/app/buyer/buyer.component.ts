import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from '../models/city';
import { CityRegion } from '../models/city_region';
import { MicroLocation } from '../models/micro_location';
import { Realestate } from '../models/realestate';
import { CityService } from '../services/city.service';
import { OfferService } from '../services/offer.service';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {

  constructor(
    private router: Router,
    private offerService: OfferService,
    private cityService: CityService
    ) { }

  ngOnInit(): void {
    this.userLogged = sessionStorage.getItem('user') ? true : false;
    if (this.userLogged) {
      switch (sessionStorage.getItem('userType')) {
        case "0":
          this.router.navigate(['/admin']);
          break;
        case "1":
          this.router.navigate(['/agent']);
          break;
      }
    } else {
      this.router.navigate(['/']);
    }

    this.offerService.getAll().subscribe((offers: Realestate[]) => {
      for (let offer of offers) {
        if (!offer.avg_price){
          this.offerService.getAllMicrolocationType(offer.microlocation, offer.type).subscribe((offers2: Realestate[]) => {
            let price = 0;
            for (let offer2 of offers2) {
              price += (offer2.price/offer2.size);
            }
            offer.avg_price = price / offers2.length;
          })
        }
        
      }
      this.allOffers = offers;

      this.cityService.getAll().subscribe((cities: City[])=>{
        this.cities = cities;
        for (let offer of this.allOffers) {
          for(let city of this.cities) {
            if (offer.city == city.code) {
              offer.city = city.name;
              break;
            }
          }
        }
      })
      this.cityService.getAllRegions().subscribe((regions: CityRegion[])=>{
        this.cityRegions = regions;
        for (let offer of this.allOffers) {
          for(let region of this.cityRegions) {
            if (offer.city_region == region.code) {
              offer.city_region = region.name;
              break;
            }
          }
        }
      })
      this.cityService.getAllMicrolocations().subscribe((miros: MicroLocation[])=>{
        this.micros = miros;
        for (let offer of this.allOffers) {
          for(let micro of this.micros) {
            if (offer.microlocation == micro.code) {
              offer.microlocation = micro.name;
              break;
            }
          }
        }
      })
    });
  }

  userLogged: boolean;
  allOffers: Realestate[] = [];
  filteredOffers: Realestate[] = [];

  cities: City[] = [];
  cityRegions: CityRegion[] = [];
  micros: MicroLocation[] = [];

  type: string;
  location: string;
  price: number;
  area: number;
  rooms: number;

  message: string = "";

  search() {
    this.message = "";
    if (!this.type) {
      this.message = "Tip je obavezan!";
      return;
    } 

    this.filteredOffers = this.allOffers;
    
    this.filteredOffers = this.filteredOffers.filter(offer => offer.type == this.type);
    
    if (this.location) {
      let loks = this.location.split('/');
      if (loks.length > 0) {
        for (let l of loks) {
          let lo = l.toLowerCase().trim().split(' ').join('_');
          this.filteredOffers = this.filteredOffers.filter(offer => offer.city.includes(lo) || offer.city_region.includes(lo) || offer.microlocation.includes(lo));
        }
      } else {
        let lo = this.location.toLowerCase().trim().split(' ').join('_');
        this.filteredOffers = this.filteredOffers.filter(offer => offer.city.includes(lo) || offer.city_region.includes(lo) || offer.microlocation.includes(lo));
      }
    }

    if (this.price) {
      this.filteredOffers = this.filteredOffers.filter(offer => offer.price <= this.price);
    }

    if (this.area) {
      this.filteredOffers = this.filteredOffers.filter(offer => offer.size >= this.area);
    }

    if (this.rooms) {
      this.filteredOffers = this.filteredOffers.filter(offer => offer.rooms >= this.rooms);
    }

    document.getElementsByClassName('offers')[0].setAttribute('style', 'display: block;');

  }

}
