import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from '../models/city';
import { CityRegion } from '../models/city_region';
import { MicroLocation } from '../models/micro_location';
import { Realestate } from '../models/realestate';
import { CityService } from '../services/city.service';
import { OfferService } from '../services/offer.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {

  constructor(
    private router: Router, 
    private cityService: CityService, 
    private offerService: OfferService
    ) { }

  ngOnInit(): void {
    this.userLogged = sessionStorage.getItem('user') ? true : false;
    if (this.userLogged) {
      switch (sessionStorage.getItem('userType')) {
        case "0":
          this.router.navigate(['/admin']);
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
    this.offer.agent = sessionStorage.getItem('user');
    this.offer.sold = 0;
    this.offer.images = [];
    this.fileValid = false;
  }

  userLogged: boolean;
  offer: Realestate = new Realestate();
  allCities: City[] = [];
  allCityRegions: CityRegion[] = [];
  allMicroLocations: MicroLocation[] = [];

  message = {
    name: "",
    city: "",
    city_region: "",
    microlocation: "",
    street: "",
    size: "",
    rooms: "",
    construction_year: "",
    state: "",
    heating: "",
    floor: "",
    total_floors: "",
    parking: "",
    monthly_utilities: "",
    price: "",
    about: "",
    type: "",
    files: ""
  };
  errorMessage: string;
  successMessage: string;
  requiredMessage: string = "Ovo polje je obavezno";
  
  valid: boolean;
  fileValid: boolean;

  files: File[] = [null];
  fileNames: any[] = [];
  fileURLs: any[] = [];
  fileSuccess: string[] = [];

  characteristics = {
    terasa: null,
    lodja: null,
    balkon: null,
    lift: null,
    podrum: null,
    garaza: null,
    basta: null,
    klima: null,
    internet: null,
    interfon: null,
    telefon: null
  }

  refreshCityRegions() {
    if (this.offer.city) {
      this.cityService.getAllCityRegions(this.offer.city).subscribe((regions: CityRegion[])=>{
        if (regions) {
          this.allCityRegions = regions;
        }
      })
    }
  }

  refreshMicroLocations() {
    if (this.offer.city) {
      this.cityService.getAllCityRegionMicroLocations(this.offer.city_region).subscribe((microLocations: MicroLocation[])=>{
        if (microLocations) {
          this.allMicroLocations = microLocations;
        }
      })
    }
  }

  saveRealestate() {

    this.checkValidation();

    if(this.valid && this.fileValid) {
      this.offer.characteristics = [];

      if (this.characteristics.terasa)    this.offer.characteristics.push('terasa');
      if (this.characteristics.lodja)     this.offer.characteristics.push('lodja');
      if (this.characteristics.balkon)    this.offer.characteristics.push('balkon');
      if (this.characteristics.lift)      this.offer.characteristics.push('lift');
      if (this.characteristics.podrum)    this.offer.characteristics.push('podrum');
      if (this.characteristics.garaza)    this.offer.characteristics.push('garaza');
      if (this.characteristics.basta)     this.offer.characteristics.push('basta');
      if (this.characteristics.klima)     this.offer.characteristics.push('klima');
      if (this.characteristics.internet)  this.offer.characteristics.push('internet');
      if (this.characteristics.interfon)  this.offer.characteristics.push('interfon');
      if (this.characteristics.telefon)   this.offer.characteristics.push('telefon');


      this.offerService.addOffer(this.offer).subscribe((resp) => {
        if (resp['success']) {
          this.offer = resp['realestate'];
          for (let i = 0; i < this.fileURLs.length; i++) {
            console.log(this.fileURLs[i]);
            this.offerService.addOfferImage(this.offer.id, this.fileURLs[i]).subscribe((resp)=>{
              this.fileSuccess.push(resp['message']);
            });
          }
          this.successMessage = "Oglas je uspešno dodat!";
        } else {
          this.errorMessage = "Greska pri dodavanju oglasa, molimo vas pokusajte ponovo kasnije ili se obratite tehnickoj podrsci";
        }
      });
    }
  }

  checkValidation() {
    this.valid = true;

    this.message.name = "";
    if (this.offer.name == null) {
      this.message.name = this.requiredMessage;
      this.valid = false;
    }
    this.message.city = "";
    if (this.offer.city == null) {
      this.message.city = this.requiredMessage;
      this.valid = false;
    }
    this.message.city_region = "";
    if (this.offer.city_region == null) {
      this.message.city_region = this.requiredMessage;
      this.valid = false;
    }
    this.message.microlocation = "";
    if (this.offer.microlocation == null) {
      this.message.microlocation = this.requiredMessage;
      this.valid = false;
    }
    this.message.street = "";
    if (this.offer.street == null) {
      this.message.street = this.requiredMessage;
      this.valid = false;
    }
    this.message.size = "";
    if (this.offer.size == null) {
      this.message.size = this.requiredMessage;
      this.valid = false;
    }
    this.message.rooms = "";
    if (this.offer.rooms == null) {
      this.message.rooms = this.requiredMessage;
      this.valid = false;
    }
    this.message.construction_year = "";
    if (this.offer.construction_year == null) {
      this.message.construction_year = this.requiredMessage;
      this.valid = false;
    }
    this.message.state = "";
    if (this.offer.state == null) {
      this.message.state = this.requiredMessage;
      this.valid = false;
    }
    this.message.heating = "";
    if (this.offer.heating == null) {
      this.message.heating = this.requiredMessage;
      this.valid = false;
    }
    this.message.floor = "";
    if (this.offer.floor == null) {
      this.message.floor = this.requiredMessage;
      this.valid = false;
    }
    this.message.total_floors = "";
    if (this.offer.total_floors == null) {
      this.message.total_floors = this.requiredMessage;
      this.valid = false;
    }
    this.message.parking = "";
    if (this.offer.parking == null) {
      this.message.parking = this.requiredMessage;
      this.valid = false;
    }
    this.message.monthly_utilities = "";
    if (this.offer.monthly_utilities == null) {
      this.message.monthly_utilities = this.requiredMessage;
      this.valid = false;
    }
    this.message.price = "";
    if (this.offer.price == null) {
      this.message.price = this.requiredMessage;
      this.valid = false;
    }
    this.message.about = "";
    if (this.offer.about == null) {
      this.message.about = this.requiredMessage;
      this.valid = false;
    }
    let about = this.offer.about.split(' ');
    if (about.length > 50) {
      this.message.about = "Opis može da ima maksmalno 50 reči";
      this.valid = false;
    }
    this.message.type = "";
    if (this.offer.type == null) {
      this.message.type = this.requiredMessage;
      this.valid = false;
    }
  }

  fileUpload(event){
    let valid = true;

    if (event.target.files && event.target.files[0]) {
      if (event.target.files.length < 3 || event.target.files.length > 6) {
        this.message.files = 'Minimalno 3, a maksimalno 6 slika';
        valid = false;
        this.fileValid = false;
        return;
      }

      let readers: FileReader[] = [];

      for (let i = 0; i < event.target.files.length; i++) {
        this.files[i] = event.target.files[i];
        this.fileNames[i] = event.target.files[i].name;

        if (event.target.files[i].size > 70000) {
          this.message.files = 'Maksimalna dozvoljena velicina je 70KB';
          valid = false;
          this.fileValid = false;
          break;
        }  

        readers[i] = new FileReader();
        readers[i].onload = (event: any) => {
          const image = new Image();
          image.src = event.target.result;    

          if (valid) {
            this.fileURLs[i] = event.target.result;
            this.fileValid = true;
            this.message.files = "";
          }
        }
        readers[i].readAsDataURL(event.target.files[i]);
      }      
    }

    console.log(this.fileURLs);
  }

  resetForm() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/agent/add-offer']);
  }); 
  }

}
