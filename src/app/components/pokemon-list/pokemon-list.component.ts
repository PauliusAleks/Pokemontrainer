import { Component, Input, OnInit } from '@angular/core';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  @Input() pokeList: any[] = [];
  page = 1;
  totalPokemons: number = 0;
  display = false;

  constructor(private pokemonCatalogueService: PokemonCatalogueService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  displayDetails() {
    this.display = true; //display added details
  }
  hideDetails() {
    this.display = false; //hide added details
  }

  getPokemons() {
    this.pokemonCatalogueService
      .getPokemons(40, this.page + 0)
      .subscribe((response: any) => {
        this.totalPokemons = response.count; //counting total pokemons for the pagination part
        response.results.forEach((result: { name: string; }) => {
          this.pokemonCatalogueService
            .getPokemon(result.name)
            .subscribe((uniqueResponse: any) => {
              this.pokeList.push(uniqueResponse);
            });
        });
      });
  }
}
