import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userLogged = sessionStorage.getItem('user') ? true : false;
    this.url = this.router.url;
  }

  userLogged: boolean;
  url: string;

  logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('userType');
    this.router.navigate(['/']);
    this.userLogged = false; 
  }

}
