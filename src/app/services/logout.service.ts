import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  constructor() { }

  //removes trainer from the sessionStorage
  logout(): void {
    sessionStorage.removeItem(StorageKeys.Trainer)
  }

}
