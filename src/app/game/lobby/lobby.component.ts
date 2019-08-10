import { Component, OnInit } from '@angular/core';
import { UserDataService } from './../../services/user-data.service';

// Routing
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})

export class LobbyComponent implements OnInit {

  constructor(private userDataService: UserDataService,
              private router: Router) { }

  matchRedirect(): void{
    this.router.navigate(['match-view']);
  }

  ngOnInit() {
    console.log("-- IN LOBBY --");
    console.log("Username: " + this.userDataService.username);
  }

}
