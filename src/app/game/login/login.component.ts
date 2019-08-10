import { Component, OnInit } from '@angular/core';

// Material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';

// Routing
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { Injectable } from '@angular/core';
import { UserDataService } from './../../services/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private router: Router,
              private userDataService: UserDataService){}

  username: string = '';

  userLogin():void {
    if(this.username){
      this.router.navigate(['lobby']);
      this.userDataService.username = this.username;
    }
  }

  ngOnInit() {
  }

}
