import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agency } from '../models/agency';
import { City } from '../models/city';
import { AgencyService } from '../services/agency.service';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-add-agency',
  templateUrl: './add-agency.component.html',
  styleUrls: ['./add-agency.component.css']
})
export class AddAgencyComponent implements OnInit {

  constructor(private router: Router, private cityService: CityService, private agencyService: AgencyService) { }

  ngOnInit(): void {
    this.userLogged = sessionStorage.getItem('user') ? true : false;
    if (this.userLogged) {
      switch (sessionStorage.getItem('userType')) {
        case "1":
          this.router.navigate(['/agent']);
          break;
        case "2":
          this.router.navigate(['/buyer']);
          break;
      }
    } else {
      this.router.navigate(['/']);
    }
    this.cityService.getAll().subscribe((cities: City[])=>{
      if (cities) {
        this.allCities = cities;
      }
    });
  }

  userLogged: boolean;
  
  agency: Agency = new Agency();
  allCities: City[] = [];

  valid: boolean;
  requiredMessage: string = "Ovo polje je obavezno";

  message = {
    name: "",
    address: "",
    city: "",
    phone: "",
    pib: ""
  }
  errorMessage: string;
  successMessage: string;

  addAgency() {
    console.log(this.agency)

    this.checkValidation();

    if(this.valid) {
      this.agencyService.checkAgencyTaken(this.agency.pib).subscribe((resp)=>{
        if (resp['pibTaken']) {
          this.valid = false;
          this.message.pib = "PIB vec postoji u sistemu";
        }

        if (this.valid) {
          this.agencyService.addAgency(this.agency).subscribe((resp)=>{
            if (resp['success']) {
              this.successMessage = "Agencija je uspesno dodata";
              this.agency = new Agency();
            } else {
              this.errorMessage = "Greska pri dodavanju agencije, molimo vas pokusajte ponovo kasnije ili se obratite tehnickoj podrsci";
            }
          });
        }
      });
    }

  }

  checkValidation() {
    this.valid = true;
    const phoneRegEx = /^\+?[0-9]+$/;

    this.message.name = "";
    if (this.agency.name == null) {
      this.message.name = this.requiredMessage;
      this.valid = false;
    }
    this.message.address = "";
    if (this.agency.address == null) {
      this.message.address = this.requiredMessage;
      this.valid = false;
    }
    this.message.city = "";
    if (this.agency.city == null) {
      this.message.city = this.requiredMessage;
      this.valid = false;
    }
    this.message.phone = "";
    if (this.agency.phone == null) {
      this.message.phone = this.requiredMessage;
      this.valid = false;
    }
    if (!phoneRegEx.test(this.agency.phone)) {
      this.message.phone = "Telefon treba da sadrži samo brojeve ili +";
      this.valid = false;
    }
    this.message.pib = "";
    if (this.agency.pib == null) {
      this.message.pib = this.requiredMessage;
      this.valid = false;
    }
  }

}
