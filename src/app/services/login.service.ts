import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.model';


const {apiUrl, apiKey} = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //Dependency Injection.
  constructor(private readonly http: HttpClient) { }

  //Login
  public login(username: string): Observable<Trainer> {
    return this.checkUsername(username)
      .pipe(
        //RxJS Operators
        switchMap((trainer: Trainer | undefined) => {
          if (trainer === undefined) { //user does not exist
            return this.createTrainer(username);
        }
          return of(trainer);
      }),
    )
  }


  //Check if trainer exists
  private checkUsername(username: string): Observable<Trainer | undefined> {
    return this.http.get<Trainer[]>(`${apiUrl}?username=${username}`)
      .pipe(
        //RxJS Operators
        map((response: Trainer[]) => response.pop())
      )
  }

  //Creating a trainer
  private createTrainer(username: string): Observable<Trainer> {
    //Create a trainer
    const trainer = {
      username,
      pokemon: []
    };

    //headers -> API Key
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": apiKey
    });

    //POST - create trainer on server
    return this.http.post<Trainer>(apiUrl, trainer, {headers})
  }


}
