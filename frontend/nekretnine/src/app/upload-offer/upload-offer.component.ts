import { Component, OnInit } from '@angular/core';
import { City } from '../models/city';
import { CityRegion } from '../models/city_region';
import { MicroLocation } from '../models/micro_location';
import { Realestate } from '../models/realestate';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-upload-offer',
  templateUrl: './upload-offer.component.html',
  styleUrls: ['./upload-offer.component.css']
})
export class UploadOfferComponent implements OnInit {

  allCities: City[] = [];
  allCityRegions: CityRegion[] = [];
  allMicrolocations: MicroLocation[] = [];  

  messageFile: string = "";
  selectedFile: File;
  realestate: Realestate = new Realestate();

  constructor(private cityService: CityService) { }

  ngOnInit(): void {
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
    let valid = true;

    this.selectedFile = event.target.files[0];

    if (this.selectedFile['type'] != "application/json") {
      this.messageFile = "Fajl nije .json!"
    }

    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, "UTF-8");
    fileReader.onload = () => {
      let uploaded = JSON.parse(fileReader.result.toString());
      console.log(uploaded);

      //check location
      if (!uploaded.Realestate.Microlocation || !uploaded.Realestate.Municipality || !uploaded.Realestate.City) {
        this.messageFile = "Nisu uneti svi podaci!";
        return
      } else {
        let microlocation = uploaded.Realestate.Microlocation;
        let city_region = uploaded.Realestate.Municipality;
        let city = uploaded.Realestate.City;

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
      }







    }
    fileReader.onerror = (error) => {
      console.log(error);
    }

    // if (event.target.files && event.target.files[0]) {
    //   if (event.target.files.length < 3 || event.target.files.length > 6) {
    //     this.messageFile = 'Minimalno 3, a maksimalno 6 slika';
    //     valid = false;
    //     this.fileValid = false;
    //     return;
    //   }

    //   let readers: FileReader[] = [];

    //   for (let i = 0; i < event.target.files.length; i++) {
    //     this.files[i] = event.target.files[i];
    //     this.fileNames[i] = event.target.files[i].name;

    //     if (event.target.files[i].size > 70000) {
    //       this.message.files = 'Maksimalna dozvoljena velicina je 70KB';
    //       valid = false;
    //       this.fileValid = false;
    //       break;
    //     }  

    //     readers[i] = new FileReader();
    //     readers[i].onload = (event: any) => {
    //       const image = new Image();
    //       image.src = event.target.result;    

    //       if (valid) {
    //         this.fileURLs[i] = event.target.result;
    //         this.fileValid = true;
    //         this.message.files = "";
    //       }
    //     }
    //     readers[i].readAsDataURL(event.target.files[i]);
    //   }      
    // }

    // console.log(this.fileURLs);
  }

}
