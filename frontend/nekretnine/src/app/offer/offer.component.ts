import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agency } from '../models/agency';
import { City } from '../models/city';
import { CityRegion } from '../models/city_region';
import { MicroLocation } from '../models/micro_location';
import { Realestate } from '../models/realestate';
import { User } from '../models/user';
import { AgencyService } from '../services/agency.service';
import { CityService } from '../services/city.service';
import { OfferService } from '../services/offer.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  userLogged: boolean;

  offerId: number;
  offer: Realestate;
  agent: User;
  agency: Agency = null;
  agencyCity: City;

  city: City;
  city_region: CityRegion;
  microlocation: MicroLocation;
  
  avgPrice: number = 1;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private offerService: OfferService,
    private userService: UserService,
    private cityService: CityService,
    private agencyService: AgencyService
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

    this.activatedRoute.params.subscribe(params => {
      this.offerId = params['id'];
    
      this.offerService.getOffer(this.offerId).subscribe((offer: Realestate) => {
        this.offer = offer;

        this.userService.getUser(offer.agent).subscribe((agent: User) => {
          this.agent = agent;

          if (agent?.agency) {
            this.agencyService.getAgency(agent.agency).subscribe((agency: Agency) => {
              this.agency = agency;
              
              this.cityService.getCity(agency.city).subscribe((city: City) => {
                this.agencyCity = city;
              });
            });
          }
        });

        this.cityService.getCity(offer.city).subscribe((city: City) => {
          this.city = city;
        });
        this.cityService.getCityRegion(offer.city_region).subscribe((city_region: CityRegion) => {
          this.city_region = city_region;
        });
        this.cityService.getMicrolocation(offer.microlocation).subscribe((microlocation: MicroLocation) => {
          this.microlocation = microlocation;
        });

        this.offerService.getAllMicrolocationType(offer.microlocation, offer.type).subscribe((offers2: Realestate[]) => {
          let price = 0;
          for (let offer2 of offers2) {
            price += (offer2.price/offer2.size);
          }
          this.avgPrice = price / offers2.length;
        })
      });
    });
  }

  showImage(i: number) {
    let current = document.getElementsByClassName('img active')[0];
    current.classList.remove('active');

    let next = document.getElementById('imgTab-'+i);
    next.classList.add('active');
  }

  showPhone() {
    document.getElementById('minus').classList.remove('hide');
    document.getElementById('plus').classList.add('hide');
    document.getElementById('phone').classList.remove('hide');
  }

  hidePhone() {
    document.getElementById('minus').classList.add('hide');
    document.getElementById('plus').classList.remove('hide');
    document.getElementById('phone').classList.add('hide');
  }


}
