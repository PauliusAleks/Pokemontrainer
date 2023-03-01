import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';


@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private _pokemons: Pokemon[] = [];

  get pokemons(): Pokemon[]{
    return this._pokemons;
  }

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

  public getPokemonByName(name: string): Pokemon | undefined {
    return this._pokemons.find((pokemon: Pokemon) => pokemon.name === name)
  }
}
