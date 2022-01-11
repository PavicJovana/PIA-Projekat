import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userLoged = sessionStorage.getItem('user') ? true : false;
    if (this.userLoged) {
      switch (sessionStorage.getItem('userType')) {
        case "1":
          //this.message = "Ovo je oglašivač";
          //this.router.navigate(['/admin']);
          break;
        case "2":
          //this.message = "Ovo je kupac";
          //this.router.navigate(['/admin']);
          break;
      }
    }
    this.refreshUsers();
  }

  userLoged: boolean;
  allPendingUsers: User[] = [];
  allUsers: User[] = [];

  logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('userType');
    this.router.navigate(['/']);
    this.userLoged = false; 
  }

  refreshUsers() {
    this.userService.getAllPendingUsers().subscribe((users: User[])=>{
      if (users) {
        this.allPendingUsers = users;
      }
    });
    this.userService.getAllUsers().subscribe((users: User[])=>{
      if (users) {
        this.allUsers = users;
      }
    });
  }

  approveUser(username: string) {
    this.userService.approveUser(username).subscribe((resp)=>{
      if (resp['success']) this.refreshUsers();
    });
  }

  rejectUser(username: string) {
    this.userService.rejectUser(username).subscribe((resp)=>{
      if (resp['success']) this.refreshUsers();
    });
  }


}
