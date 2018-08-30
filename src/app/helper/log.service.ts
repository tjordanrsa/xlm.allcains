import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logging = true;
  constructor() { }

  error(msg: String) {

    if (this.logging) {
      console.error(msg);
    }
  }
}
