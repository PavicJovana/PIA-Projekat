import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userLogged = sessionStorage.getItem('user') ? true : false;
    if (this.userLogged) {
      switch (sessionStorage.getItem('userType')) {
        case "0":
          this.router.navigate(['/admin']);
          break;
        case "1":
          this.router.navigate(['/agent']);
          break;
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  userLogged: boolean;

}
