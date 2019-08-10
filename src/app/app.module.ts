import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './game/login/login.component';
import { LobbyComponent } from './game/lobby/lobby.component';
import { MatchViewComponent } from './game/match-view/match-view.component';

import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

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
]

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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
