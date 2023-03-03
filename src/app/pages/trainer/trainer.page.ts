import { Component, Input, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { LogoutService } from 'src/app/services/logout.service';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';
import { TrainerService } from 'src/app/services/trainer.service';


@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})
export class TrainerPage implements OnInit {

  @Input() pokemonName: string = "";
  pokemonOwned: any[] = []; //list of ownedPokemons

  constructor(
    private readonly trainerService: TrainerService,
    private readonly pokemonCatalogueService: PokemonCatalogueService,
    private readonly logoutService: LogoutService
  ){ }

  get trainer(): Trainer | undefined {
    return this.trainerService.trainer
  }


  get pokemons(): string[] { // trainers's pokemons (list of pokemon names)
    if (this.trainerService.trainer) {
      return this.trainerService.trainer.pokemon
    }
    return [];
  }
  

  getPokemons() {
    if(this.trainerService.trainer) {
      this.trainerService.trainer.pokemon.forEach((name: string) => {
        this.pokemonCatalogueService.getPokemon(name)
          .subscribe((uniqueResponse: any) => {
            this.pokemonOwned.push(uniqueResponse);
          })
      })
    }
  }

  ngOnInit(): void {
    this.getPokemons()
  }

  logout() {
    if(window.confirm("You will be logged out. Are you sure?")) {
      this.logoutService.logout()
      window.location.reload();
    }
  }
}

