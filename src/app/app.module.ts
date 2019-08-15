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
import {MatDividerModule} from '@angular/material/divider';

// Flex layout
import { FlexLayoutModule } from '@angular/flex-layout';

// Services
import { Injectable } from '@angular/core';
import { InfoPanelComponent } from './game/match-view/info-panel/info-panel.component';

// panzoom
import { Ng2PanZoomModule } from 'ng2-panzoom';

// HttpClientModule
import { HttpClientModule }    from '@angular/common/http';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'lobby', component: LobbyComponent },
  { path: 'match-view', component: MatchViewComponent },

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
    PageNotFoundComponent,
    InfoPanelComponent
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
    MatDividerModule,

    FlexLayoutModule,

    Ng2PanZoomModule,

    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
