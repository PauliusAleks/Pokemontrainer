import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment';

// const {apiPokemon} = environment

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  constructor(
    private http: HttpClient
  ) { }
  
  // Gets a specific amount of pokemons
  getPokemons(limit: number, offset: number) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  }

  // Gets a specific pokemon
  getPokemon(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  }
}
