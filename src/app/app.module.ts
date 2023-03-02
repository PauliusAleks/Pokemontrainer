import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { PokemonCataloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CatchButtonComponent } from './components/catch-button/catch-button.component';

//Decorator
@NgModule({ 
declarations: [ //Components
    AppComponent,
    LoginPage,
    PokemonCataloguePage,
    TrainerPage,
    LoginFormComponent,
    PokemonListComponent,
    NavbarComponent,
    CatchButtonComponent,
  ],
  imports: [ //Modules 
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
