import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from '../models/city';
import { CityRegion } from '../models/city_region';
import { MicroLocation } from '../models/micro_location';
import { Realestate } from '../models/realestate';
import { User } from '../models/user';
import { CityService } from '../services/city.service';
import { OfferService } from '../services/offer.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-upload-offer',
  templateUrl: './upload-offer.component.html',
  styleUrls: ['./upload-offer.component.css']
})
export class UploadOfferComponent implements OnInit {

  userLogged: boolean;
  agent:  User;

  allCities: City[] = [];
  allCityRegions: CityRegion[] = [];
  allMicrolocations: MicroLocation[] = [];  

  fileValid: boolean = false;
  imagesValid: boolean = false;

  messageFile: string = "";
  selectedFile: File;
  realestate: Realestate = new Realestate();

  messageImages = "";
  images: File[] = [null];
  imageNames: any[] = [];
  imageURLs: any[] = [];
  imageSuccess: string[] = [];

  successMessage: string = "";
  errorMessage: string = "";


  constructor(
    private router: Router,
    private userService: UserService,
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
    this.userService.getUser(sessionStorage.getItem('user')).subscribe((user: User) => {
      this.agent = user;
    });

    this.cityService.getAll().subscribe((cities: City[]) => {
      this.allCities = cities;
    });
    this.cityService.getAllRegions().subscribe((regions: CityRegion[]) => {
      this.allCityRegions = regions;
    });
    this.cityService.getAllMicrolocations().subscribe((micros: MicroLocation[]) => {
      this.allMicrolocations = micros
    });
  }

  fileUpload(event){
    this.messageFile = "";

    this.selectedFile = event.target.files[0];

    if (this.selectedFile['type'] != "application/json") {
      this.messageFile = "Fajl nije .json!"
    }

    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, "UTF-8");
    fileReader.onload = () => {
      let uploaded = JSON.parse(fileReader.result.toString());

      if (!uploaded.Realestate || !uploaded.Advertiser) {
        this.messageFile = "Nisu uneti svi podaci!";
        return
      }

      //check agent
      if (uploaded.Advertiser.length == 2) {
        //agent agencije
        if (uploaded.Advertiser[0].PIB != this.agent.agency) {
          this.messageFile = "Agencija ne odgovara agenciji prijavljenog korisnika";
          return;
        }
        if (uploaded.Advertiser[1].FirstName != this.agent.firstname
          || uploaded.Advertiser[1].LastName != this.agent.lastname
          || uploaded.Advertiser[1].Phone != this.agent.phone ) {
            this.messageFile = "Podaci oglašivaca ne odgovaraju podacima prijavljenog korisnika";
            return;
          }
      } else if (uploaded.Advertiser.length == 1) {
        //samostalni oglasivac
        if (uploaded.Advertiser[0].FirstName != this.agent.firstname
          || uploaded.Advertiser[0].LastName != this.agent.lastname
          || uploaded.Advertiser[0].Phone != this.agent.phone ) {
            this.messageFile = "Podaci oglašivaca ne odgovaraju podacima prijavljenog korisnika";
            return;
          }
      }


      //check all entered
      if (!uploaded.Realestate.Name || !uploaded.Realestate.City || !uploaded.Realestate.Municipality || !uploaded.Realestate.Microlocation
        || !uploaded.Realestate.Street || !uploaded.Realestate.Area || !uploaded.Realestate.Rooms || !uploaded.Realestate.ConstructionYear
        || !uploaded.Realestate.State || !uploaded.Realestate.Heating || !uploaded.Realestate.Floor || !uploaded.Realestate.TotalFloors
        || !uploaded.Realestate.Parking || !uploaded.Realestate.MonthlyUtilities || !uploaded.Realestate.Price
        || !uploaded.Realestate.About || !uploaded.Realestate.Characteristics) {
        this.messageFile = "Nisu uneti svi podaci!";
        return
      }

      //check numbers are numbers
      if (isNaN(+uploaded.Realestate.Area)) {
        this.messageFile = "Area mora biti broj!";
        return;
      }
      if (isNaN(+uploaded.Realestate.Area)) {
        this.messageFile = "Kadratura (Area) mora biti broj!";
        return;
      }
      if (isNaN(+uploaded.Realestate.Rooms)) {
        this.messageFile = "Broj soba (Rooms) mora biti broj!";
        return;
      }
      if (isNaN(+uploaded.Realestate.ConstructionYear)) {
        this.messageFile = "Godina izgradnje (ConstructionYear) mora biti broj!";
        return;
      }
      if (isNaN(+uploaded.Realestate.TotalFloors)) {
        this.messageFile = "Ukupno spratova (TotalFloors) mora biti broj!";
        return;
      }
      if (isNaN(+uploaded.Realestate.MonthlyUtilities)) {
        this.messageFile = "Mesečni troškovi (MonthlyUtilities) mora biti broj!";
        return;
      }
      if (isNaN(+uploaded.Realestate.Price)) {
        this.messageFile = "Cena (Price) mora biti broj!";
        return;
      }

      //check if correct values
      let stateValues = ['izvorno', 'renovirano', 'lux'];
      let lowerState = uploaded.Realestate.State.toLowerCase();
      if (!stateValues.includes(lowerState)) {
        this.messageFile = "Stanje (State) mora biti izvorno, renovirano ili lux!";
        return;
      }
      let parkingValues = ['da', 'ne'];
      let lowerParking = uploaded.Realestate.Parking.toLowerCase();
      if (!parkingValues.includes(lowerParking)) {
        this.messageFile = "Parking (PArking) mora biti da ili ne!";
        return;
      }
      let charValues = ['terasa', 'lođa', 'lodja', 'francuski balkon', 'lift', 'podrum', 'garaža', 'garaza', 'sa baštom', 'sa bastom', 
                        'klima', 'internet', 'interfon', 'telefon'];
      if (!Array.isArray(uploaded.Realestate.Characteristics)) {
        this.messageFile = "Karakteristike (Characteristics) mora biti niz sa mogućim vrednostima Terasa, Lođa, Francuski balkon, Lift, " +
                            "Podrum, Garaža, Sa baštom, Klima, Internet, Interfon, Telefon!";
        return;
      }
      let valid = true;
      for (let c of uploaded.Realestate.Characteristics) {
        if (!charValues.includes(c.toLowerCase())) {
          valid = false;
          break;
        }
      }
      if (!valid) {
        this.messageFile = "Karakteristike (Characteristics) mora biti niz sa mogućim vrednostima Terasa, Lođa, Francuski balkon, Lift, " +
                            "Podrum, Garaža, Sa baštom, Klima, Internet, Interfon, Telefon!";
        return;
      }

      //check location
      let city = uploaded.Realestate.City;
      let city_region = uploaded.Realestate.Municipality;
      let microlocation = uploaded.Realestate.Microlocation;

      let foundCity = false;
      let foundRegion = false;
      let foundMicro = false;
      for(let city1 of this.allCities) {
        if (city.toLowerCase() == city1.name.toLowerCase()) {
          foundCity = true;
          for(let region of this.allCityRegions) {
            if(city1.code == region.city && city_region.toLowerCase() == region.name.toLowerCase()) {
              foundRegion = true;
              for(let micro of this.allMicrolocations) {
                if(region.code == micro.city_region && microlocation.toLowerCase() == micro.name.toLowerCase()) {
                  foundMicro = true;
                  break;
                }
              }
              break;
            }
          }
          break;
        }
      }
      if (!foundCity) {
        this.messageFile = "Grad ne postoji u bazi";
        return;
      }
      if (!foundRegion) {
        this.messageFile = "Opstina ne postoji u bazi";
        return;
      }
      if (!foundMicro) {
        this.messageFile = "Mikrolokacija ne postoji u bazi";
        return;
      }

      //location valid
      this.realestate.city = city;
      this.realestate.city_region = city_region;
      this.realestate.microlocation = microlocation;

      //Not in example file they sent so it's not required
      //type
      if (uploaded.Realestate.Type) {
        switch (uploaded.Realestate.Type.toLowerCase()) {
          case "apartment":
            this.realestate.type = "apartment";
            break;
          case "house":
            this.realestate.type = "house";
            break;
          case "cabin":
            this.realestate.type = "cabin";
            break;
          case "local":
            this.realestate.type = "local";
            break;
          case "warehouse":
            this.realestate.type = "warehouse";
            break;
          default:
            this.realestate.type = "apartment";
            break;
        }
      } else {
        this.realestate.type = "apartment"
      }

      this.realestate.name = uploaded.Realestate.Name;
      this.realestate.street = uploaded.Realestate.Street;
      this.realestate.size = uploaded.Realestate.Area;
      this.realestate.rooms = uploaded.Realestate.Rooms;
      this.realestate.construction_year = uploaded.Realestate.ConstructionYear;
      this.realestate.state = lowerState;
      this.realestate.heating = uploaded.Realestate.Heating;
      this.realestate.floor = uploaded.Realestate.Floor;
      this.realestate.total_floors = uploaded.Realestate.TotalFloors;
      if (lowerParking == 'da') this.realestate.parking = 1;
      else this.realestate.parking = 0;
      this.realestate.monthly_utilities = uploaded.Realestate.MonthlyUtilities;
      this.realestate.price = uploaded.Realestate.Price;
      this.realestate.about = uploaded.Realestate.About;
      this.realestate.sold = 0;

      this.realestate.characteristics = [];
      for (let c of uploaded.Realestate.Characteristics) {
        switch (c.toLowerCase()) {
          case 'terasa' :
            this.realestate.characteristics.push('terasa'); break;
          case 'lođa' :
          case 'lodja' :
            this.realestate.characteristics.push('lodja'); break;
          case 'francuski balkon' :
            this.realestate.characteristics.push('balkon'); break;
          case 'lift' :
            this.realestate.characteristics.push('lift'); break;
          case 'podrum' :
            this.realestate.characteristics.push('podrum'); break;
          case 'garaža' :
          case 'garaza' :
            this.realestate.characteristics.push('garaza'); break;
          case 'sa baštom' :
          case 'sa bastom' :
            this.realestate.characteristics.push('basta'); break;
          case 'klima' :
            this.realestate.characteristics.push('klima'); break;
          case 'internet' :
            this.realestate.characteristics.push('internet'); break;
          case 'interfon' :
            this.realestate.characteristics.push('interfon'); break;
          case 'telefon' :
            this.realestate.characteristics.push('telefon'); break;
        }
      }

      this.realestate.agent = this.agent.username;

      this.fileValid = true;
    }
    fileReader.onerror = (error) => {
      console.log(error);
    }
  }

  step2() {
    let step1 = document.getElementById("step-1");
    let step2 = document.getElementById("step-2");

    step1.setAttribute("style", "display:none;");
    step2.setAttribute("style", "display:block;");
  }

  imageUpload(event){
    let valid = true;

    if (event.target.files && event.target.files[0]) {
      if (event.target.files.length < 3 || event.target.files.length > 6) {
        this.messageImages = 'Minimalno 3, a maksimalno 6 slika';
        valid = false;
        this.imagesValid = false;
        return;
      }

      let readers: FileReader[] = [];

      for (let i = 0; i < event.target.files.length; i++) {
        this.images[i] = event.target.files[i];
        this.imageNames[i] = event.target.files[i].name;

        if (event.target.files[i].size > 70000) {
          this.messageImages = 'Maksimalna dozvoljena velicina je 70KB';
          valid = false;
          this.imagesValid = false;
          break;
        }  

        readers[i] = new FileReader();
        readers[i].onload = (event: any) => {
          const image = new Image();
          image.src = event.target.result;    

          if (valid) {
            this.imageURLs[i] = event.target.result;
            this.imagesValid = true;
            this.messageImages = "";
          }
        }
        readers[i].readAsDataURL(event.target.files[i]);
      }      
    }

  }

  step3() {
    let step2 = document.getElementById("step-2");
    let step3 = document.getElementById("step-3");

    step2.setAttribute("style", "display:none;");
    step3.setAttribute("style", "display:block;")
  }

  save() {
    if (this.fileValid && this.imagesValid) {
      this.offerService.addOffer(this.realestate).subscribe((resp) => {
        if (resp['success']) {
          this.realestate = resp['realestate'];
          for (let i = 0; i < this.imageURLs.length; i++) {
            console.log(this.imageURLs[i]);
            this.offerService.addOfferImage(this.realestate.id, this.imageURLs[i]).subscribe((resp)=>{
              this.imageSuccess.push(resp['message']);
            });
          }
          this.successMessage = "Oglas je uspešno dodat!";
        } else {
          this.errorMessage = "Greska pri dodavanju oglasa, molimo vas pokusajte ponovo kasnije ili se obratite tehnickoj podrsci";
        }
      });
    }

  }
}
