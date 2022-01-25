import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {

  constructor(private router: Router) { }

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
  }

  userLogged: boolean;

}
