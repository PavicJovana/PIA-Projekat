import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agency } from '../models/agency';
import { City } from '../models/city';
import { User } from '../models/user';
import { AgencyService } from '../services/agency.service';
import { CityService } from '../services/city.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private router: Router, 
    private userService: UserService, 
    private cityService: CityService,
    private agencyService: AgencyService
    ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('user')) {
      switch (sessionStorage.getItem('userType')) {
        case "0":
          this.router.navigate(['/admin']);
          break;
        case "1":
          this.router.navigate(['/agent']);
          break;
        case "2":
          this.router.navigate(['/buyer']);
          break;
      }
    } else {
      this.user.birthday = new Date();
      this.user.status = 2;
      this.fileValid = false;
      this.generateCaptchaValue();
      this.cityService.getAll().subscribe((cities: City[])=>{
        if (cities) {
          this.allCities = cities;
        }
      });
      this.agencyService.getAll().subscribe((agencies: Agency[])=>{
        if (agencies) {
          this.allAgencies = agencies;
        }
      });
    }
  }

  allCities: City[] = [];
  allAgencies: Agency[] = [];

  user: User = new User();
  passwordSecond: string;
  agent: boolean;

  file: File = null;
  fileName: any;
  fileURL: any;
  fileValid: boolean;

  initCaptcha: string;
  submitCaptcha: string;

  imagePreview: string;
  cardImageBase64: string;

  valid: boolean;
  requiredMessage: string = "Ovo polje je obavezno";

  message = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    passwordSecond: "",
    city: "",
    birthday: "",
    phone: "",
    email: "",
    type: "",
    licence_number: "",
    agency: "",
    file: "",
    captcha: ""
  };
  errorMessage: string;
  successMessage: string;

  fileUpload(event){
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      this.fileName = event.target.files[0].name;

      //check if image valid
      const min_wh = 100;
      const max_wh = 300;

      let valid = true;

      const reader = new FileReader();
      reader.onload = (event: any) => {
        const image = new Image();
        image.src = event.target.result;
        image.onload = (e: any) => {
          const img_height = e.currentTarget['height'];
          const img_width = e.currentTarget['width'];

          if (img_height < min_wh || img_height > max_wh || img_width < min_wh || img_width > max_wh) {
            this.message.file = 'Minimalna dozvoljena velicina 100x100px, a maksimalna 300x300px';
            valid = false;
            this.fileValid = false;
          }
        }
        if (valid) {
          this.fileURL = event.target.result;
          this.fileValid = true;
          this.message.file = "";
        }
      }
      reader.readAsDataURL(event.target.files[0]);
    }

    // //prikaz slke
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.imagePreview = <string> reader.result;
    // };
    // reader.readAsDataURL(this.file);    
  }


  // uploadImage() {
  //   //Upload file here send a binary data
  //   this.http.post('./assets/img.png', this.file)
  //   .subscribe((resp)=>{
  //     alert(resp);  
  //   });
  // }

  register() {

    if(!this.agent) {
      this.user.agency = null;
      this.user.licence_number = null;
    }

    this.checkValidation();

    if(this.valid && this.fileValid) {
      this.userService.checkUserDataTaken(this.user.username, this.user.email, this.user.licence_number).subscribe((resp)=>{
        if (resp['usernameTaken']) {
          this.valid = false;
          this.message.username = "Ovo korisničko ime je već zauzeto";
        }
        if (resp['emailTaken']) {
          this.valid = false;
          this.message.email = "Postoji korisnik sa ovom email adresom";
        }
        if (resp['licenceNumberTaken']) {
          this.valid = false;
          this.message.licence_number = "Postoji korisnik sa ovim brojem licence";
        }

        if (this.valid) {
          this.user.image = this.fileURL;

          this.userService.register(this.user).subscribe((resp)=>{
            if (resp['success']) {
              this.successMessage = "Vas zahtev za registraciju je sacuvan, sacekajte da ga neko odobri";
              setTimeout(() => {
                this.router.navigate(['/']);
              }, 2000);
            } else {
              this.errorMessage = "Greska pri registraciji korisnika, molimo vas pokusajte ponovo kasnije ili se obratite tehnickoj podrsci";
            }
          });
        } else {
          this.generateCaptchaValue();
        }
      });
    } else {
      this.generateCaptchaValue();
    }

  }

  checkValidation() {
    this.valid = true;
    const passwordRegEx = /((^([A-Z])(?=.*[a-z])|(^[a-z])(?=.*[A-Z]))(?=.*\d)(?=.*[@$!%*#?&\.])).{7,}/;
    const phoneRegEx = /^\+?[0-9]+$/;
    const emailRegEx = /^\S+@\S+\.\S+$/;

    this.message.firstname = "";
    if (this.user.firstname == null) {
      this.message.firstname = this.requiredMessage;
      this.valid = false;
    }
    this.message.lastname = "";
    if (this.user.lastname == null) {
      this.message.lastname = this.requiredMessage;
      this.valid = false;
    }
    this.message.username = "";
    if (this.user.username == null) {
      this.message.username = this.requiredMessage;
      this.valid = false;
    }
    this.message.password = "";
    if (this.user.password == null) {
      this.message.password = this.requiredMessage;
      this.valid = false;
    }
    if (!passwordRegEx.test(this.user.password)) {
      this.message.password = "Šifra nije dobrog formata (minimalno 8 karaktera, bar jedno veliko slovo, jedan broj i jedan specijalni karakter i mora počinjati slovom)";
      this.valid = false;
    }
    this.message.passwordSecond = "";
    if (this.passwordSecond == null) {
      this.message.passwordSecond = this.requiredMessage;
      this.valid = false;
    }
    if (this.passwordSecond && this.passwordSecond != this.user.password) {
      this.message.passwordSecond = "Šifre se ne poklapaju";
      this.valid = false;
    }
    this.message.city = "";
    if (this.user.city == null) {
      this.message.city = this.requiredMessage;
      this.valid = false;
    }
    this.message.phone = "";
    if (this.user.phone == null) {
      this.message.phone = this.requiredMessage;
      this.valid = false;
    }
    if (!phoneRegEx.test(this.user.phone)) {
      this.message.phone = "Telefon treba da sadrži samo brojeve ili +";
      this.valid = false;
    }
    this.message.email = "";
    if (this.user.email == null) {
      this.message.email = this.requiredMessage;
      this.valid = false;
    }
    if (!emailRegEx.test(this.user.email)) {
      this.message.email = "Email nije ispravan";
      this.valid = false;
    }
    this.message.type = "";
    if (this.user.type == null) {
      this.message.type = this.requiredMessage;
      this.valid = false;
    }
    if(this.user.type == 1) {
      this.message.licence_number = "";
      if (this.user.licence_number == null) {
        this.message.licence_number = this.requiredMessage;
        this.valid = false;
      }
      if (this.agent) {
        this.message.agency = "";
        if (this.user.agency == null) {
          this.message.agency = this.requiredMessage;
          this.valid = false;
        }
      }
    }
    if (this.file == null) {
      this.message.file = this.requiredMessage;
      this.valid = false;
    }
    this.message.captcha = "";
    if (this.submitCaptcha == null) {
      this.message.captcha = this.requiredMessage;
      this.valid = false;
      this.generateCaptchaValue();
    }
    if (this.submitCaptcha.trim() != this.initCaptcha) {
      this.message.captcha = "CAPTCHA nije ispravno popunjena";
      this.valid = false;
      this.generateCaptchaValue();
    }
  }

  generateCaptchaValue() {
    let alpha = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
                          'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', 
                          '0','1','2','3','4','5','6','7','8','9'); 
    let code = "";
    for(let i=0; i<7; i++) {
      code += alpha[Math.floor(Math.random() * alpha.length)];
    }

    this.initCaptcha = code;
    this.submitCaptcha = "";
  }

}
