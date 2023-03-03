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

@Input() pokemon: string = "";

get loading(): Boolean {
  return this.catchService.loading;
}

  constructor(
    private trainerService: TrainerService,
    private readonly catchService: CatchService
  ) { }

  ngOnInit(): void {
    this.isCaught = Boolean(this.trainerService.trainer?.pokemon.some(pokemon => pokemon === this.pokemon))
  }
  //Handling pokemon catch (clicking on pokeball)
  onCatchClick(): void {
    //Add pokemon to api
    this.catchService.addPokemonToApi(this.pokemon)//using catchService to add Pokemon to user.
      .subscribe({
        next: (response: Trainer) => {
          this.isCaught = this.trainerService.inApi(this.pokemon)//
        },
        error: (error:HttpErrorResponse) => {
          console.log("ERROR", error.message);
        }
      })
  }
}
