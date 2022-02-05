import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Realestate } from '../models/realestate';
import { OfferService } from '../services/offer.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  constructor(private router: Router, private offerService: OfferService) { }

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

    this.getAll();
  }

  userLogged: boolean;

  allMyOffers: Realestate[] = [];

  getAll() {
    this.offerService.getAllAgentsOffers(sessionStorage.getItem('user')).subscribe((realestates: Realestate[])=>{
      if (realestates) {
        this.allMyOffers = realestates;
      }
    });
  }

  editOffer(offerId: number) {}

  sellOffer(offerId: number) {
    
    this.offerService.sellOffer(offerId).subscribe(resp => {
      if (resp['success']) {
        this.getAll();
      } else {
        alert ("Greska pri cuvanju promene, molimo vas pokusajte ponovo kasnije ili se obratite tehnickoj podrsci");
      }
    });

  }

}
