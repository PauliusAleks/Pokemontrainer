import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private _trainer?: Trainer;

  get trainer(): Trainer | undefined{
    return this._trainer;
  }
  
  set trainer(trainer: Trainer | undefined) {
    StorageUtil.storageSave<Trainer>(StorageKeys.Trainer, trainer!); //(!) on the end means that it is never undefined
    this._trainer = trainer;
  }

  constructor() {
    this._trainer = StorageUtil.storageRead<Trainer>(StorageKeys.Trainer);
  }

  public inApi(pokemonName: string): boolean {
    if (this._trainer){
      return Boolean(this._trainer.pokemon.some(pokemon => pokemon === pokemonName))
    }
    return false;
  }

  public addToApi(pokemonName: string): void {
    if (this._trainer){
      this._trainer.pokemon.push(pokemonName);
    }
  }

  public removeFromApi(pokemonName: string): void {
    if (this._trainer){
      this._trainer.pokemon = this._trainer.pokemon.filter(item => item !== pokemonName);
    }
  }
}
