import { Component, OnInit } from '@angular/core';
import { UserDataService } from './../../services/user-data.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  constructor(private userDataService: UserDataService) { }

  ngOnInit() {
    console.log("Username: " + this.userDataService.username)
  }

}
