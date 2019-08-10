import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Componente si view-uri
import { AppComponent } from './app.component';
import { LoginComponent } from './game/login/login.component';
import { LobbyComponent } from './game/lobby/lobby.component';
import { MatchViewComponent } from './game/match-view/match-view.component';

import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

// Unelte Angular Material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';

// Flex layout
import { FlexLayoutModule } from '@angular/flex-layout';

// Services
import { Injectable } from '@angular/core';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'lobby', component: LobbyComponent },

  // Redirect automat spre login la accesarea site-ului
  {
    path: '',
    redirectTo: '/login',
    pathMatch:'full'
  },

  // 404
  { path:'**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LobbyComponent,
    MatchViewComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),

    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,

    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
