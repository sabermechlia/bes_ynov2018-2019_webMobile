import { ImdbApiGlobal } from './../../models/imdbapi-global.model';
import { Injectable } from '@angular/core';


import {Http} from '@angular/http'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class omdbApiService{
    private baseUrl: string ='http://www.omdbapi.com/?apikey=75522b56&t=';
  constructor(private http: Http){

  }  
  public getResutat() :Promise<ImdbApiGlobal>{
   const url=`${this.baseUrl}The Dark Knight`;
   return this.http.get(url)
   .toPromise()
   .then(response => response.json() )
   .catch(error => console.log('une erreur est servenue'+error))
  }
}