import { Component, OnInit } from '@angular/core';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokeList: any[] = [];

  constructor(
    private pokemonCatalogueService: PokemonCatalogueService
  ) {}

  ngOnInit(): void {
    this.getPokemons();
  }
  getPokemons() {
    this.pokemonCatalogueService.getPokemons(6)
      .subscribe((response: any) => {
        response.results.forEach((result: { name: string; }) => {
          this.pokemonCatalogueService.getPokemon(result.name).subscribe((uniqueResponse: any) => {
            this.pokeList.push(uniqueResponse);
            console.log(this.pokeList)
        })
      })
    })
  }
}