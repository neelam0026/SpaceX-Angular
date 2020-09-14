import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { BaseServices } from './base.service';

@Injectable({
  providedIn: 'root'
})

export class ApiServices {
 
  constructor(private _basesServices: BaseServices) { }

  getSpacex(Obj): Observable<any> {
    return this._basesServices.getRequestForSpacex(`https://api.spacexdata.com/v3/launches?limit=100`+Obj.optional)
  }
  
}