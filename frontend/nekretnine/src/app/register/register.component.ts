import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('user')) {
      switch (sessionStorage.getItem('userType')) {
        case "0":
          //this.message = "Ovo je admin";
          //this.router.navigate(['/admin']);
          break;
        case "1":
          //this.message = "Ovo je oglašivač";
          //this.router.navigate(['/admin']);
          break;
        case "2":
          //this.message = "Ovo je kupac";
          //this.router.navigate(['/admin']);
          break;
      }
    } else {
      this.user.birthday = new Date();
      this.user.status = 0;
    }

  }

  user: User = new User();
  passwordSecond: string;
  agent: boolean;

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
    agency: ""
  };

  register() {
    console.log(this.user);

    if(!this.agent) this.user.agency = null;

    this.checkValidation();

    if(this.valid) {
      console.log('check...');
      this.userService.checkUsernameAndEmailTaken(this.user.username, this.user.email).subscribe((resp)=>{
        console.log('finished');
        if (resp['usernameTaken']) {
          this.valid = false;
          this.message.username = "Ovo korisničko ime je već zauzeto";
        }
        if (resp['emailTaken']) {
          this.valid = false;
          this.message.email = "Postoji korisnik sa ovom email adresom"
        }

        if (this.valid) {
          this.userService.register(this.user).subscribe((resp)=>{
            if (resp['success']) {
              alert(resp['message']);
            } else {
              //
            }
          });
        }
      });
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
      this.message.phone = "Telefon treba da sadrži samo brojeve";
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
  }
}
