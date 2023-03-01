import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { CatchService } from 'src/app/services/catch.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-catch-button',
  templateUrl: './catch-button.component.html',
  styleUrls: ['./catch-button.component.css']
})

export class CatchButtonComponent implements OnInit{
  
public isCaught: boolean = false;

@Input() pokemonName: string = "";

get loading(): Boolean {
  return this.catchService.loading;
}

  constructor(
    private trainerService: TrainerService,
    private readonly catchService: CatchService
  ) { }

  ngOnInit(): void {
    this.isCaught = Boolean(this.trainerService.trainer?.pokemon.some(pokemon => pokemon === this.pokemonName))
  }

  onCatchClick(): void {
    //Add pokemon to api
    this.catchService.addPokemonToApi(this.pokemonName)
      .subscribe({
        next: (response: Trainer) => {
          this.isCaught = this.trainerService.inApi(this.pokemonName)
        },
        error: (error:HttpErrorResponse) => {
          console.log("ERROR", error.message);
        }
      })
  }
}
