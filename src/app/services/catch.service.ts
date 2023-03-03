import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.model';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { TrainerService } from './trainer.service';

const {apiKey, apiUrl} = environment
@Injectable({
  providedIn: 'root'
})
export class CatchService {

  private _loading: Boolean = false;

  get loading(): Boolean {
    return this._loading;
  }

  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService,
    private readonly trainerService: TrainerService,
    private readonly http: HttpClient,
  ) { }

  //Adding pokemons to the api (trainer.pokemon[])
  public addPokemonToApi(name: string): Observable<Trainer> {
    if(!this.trainerService.trainer){
      throw new Error("addPokemonToApi: There is no user")
    }

    const trainer: Trainer = this.trainerService.trainer;
    const pokemon = this.pokemonCatalogueService.getPokemon(name)

    if(!pokemon){
      throw new Error ("addPokemonToApi: No pokemon with name: " + name)
    }
    
    if(this.trainerService.trainer?.pokemon.some(pokemon => pokemon === name)) {
      this.trainerService.removeFromApi(name);
    } 
    else {
      this.trainerService.addToApi(name);
    }

    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': apiKey
    })

    this._loading = true;

    // Updating trainer's pokemons
    return this.http.patch<Trainer>(`${apiUrl}/${trainer.id}`, {
      pokemon: [...trainer.pokemon]
    }, {
      headers
    })
    .pipe(
      tap((updatedTrainer: Trainer) => {
        this.trainerService.trainer = updatedTrainer;
      }),
      finalize(() => {
        this._loading = false;
      })
    )
  }


}
