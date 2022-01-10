import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('user')) {
      switch (sessionStorage.getItem('userType')) {
        case "0":
          this.message = "Ovo je admin";
          this.router.navigate(['/register']);
          break;
        case "1":
          this.message = "Ovo je oglašivač";
          //this.router.navigate(['/admin']);
          break;
        case "2":
          this.message = "Ovo je kupac";
          //this.router.navigate(['/admin']);
          break;
      }
    }
  }

  username: string;
  password: string;

  message: string;

  login() {
    this.userService.login(this.username, this.password).subscribe((user: User) => {
      if (user) {
        if (user.status == 1) {
          sessionStorage.setItem('user', user.username);
          sessionStorage.setItem('userType', user.type.toString());
          
          switch (user.type) {
            case 0:
              this.message = "Ovo je admin";
              this.router.navigate(['/logedIn']).then(()=>this.router.navigate(['/register']));
              break;
            case 1:
              this.message = "Ovo je oglašivač";
              break;
            case 2:
              this.message = "Ovo je kupac";
              break;
          }
        } else{
          if (user.status == 2) {
            this.message = "Nalog još nije odobren!";
          } else {
            this.message = "Nalog je odbijen!"
          }
        }
      } else {
        this.message = "Uneti podaci nisu ispravni!";
      }
    })
  }

}
