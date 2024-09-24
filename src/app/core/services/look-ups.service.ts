import { Injectable } from '@angular/core';
import { RestService   } from '@app-core/index';

@Injectable({ providedIn: 'root' })

export class LookupsService  {

  constructor(
    private restService: RestService){
  }

}