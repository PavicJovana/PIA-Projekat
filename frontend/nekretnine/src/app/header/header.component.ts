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
    this.userLoged = sessionStorage.getItem('user') ? true : false;
  }

  userLoged: boolean;

  logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('userType');
    this.router.navigate(['/']);
    this.userLoged = false; 
  }

}
