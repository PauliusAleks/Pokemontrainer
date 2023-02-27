import { Component, OnInit } from '@angular/core';
// import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';

@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.page.html',
  styleUrls: ['./pokemon-catalogue.page.css']
})
export class PokemonCataloguePage{} //implements OnInit{

  // pokeList: any[] = [];

  // constructor(
  //   private pokemonCatalogueService: PokemonCatalogueService
  // ) {}

  // ngOnInit(): void {
  //   this.pokemonCatalogueService.getPokemons(100);
  // }
  // getPokemons() {
  //   this.pokemonCatalogueService.getPokemons(6).subscribe((response: any) => {
  //     response.results.forEach((result: { name: string; }) => {
  //       this.pokemonCatalogueService.getPokemon(result.name).subscribe((uniqueResponse: any) => {
  //         this.pokeList.push(uniqueResponse);
  //         console.log(this.pokeList)
  //       })
  //     })
  //   })
  // }
// }
