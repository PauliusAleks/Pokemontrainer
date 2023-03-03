import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage{

  constructor(private readonly router: Router) {}

  //Runs when login form is successfully completed
  handleLogin(): void {
    this.router.navigateByUrl("/pokemons")
  }
}
