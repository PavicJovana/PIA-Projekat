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
          this.router.navigate(['/admin']);
          break;
        case "1":
          this.router.navigate(['/agent']);
          break;
        case "2":
          this.router.navigate(['/buyer']);
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
              this.router.navigate(['/admin']);
              break;
            case 1:
              this.router.navigate(['/agent']);
              break;
            case 2:
              this.router.navigate(['/buyer']);
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
