import { ImdbApiGlobal } from './../../models/imdbapi-global.model';
import { Injectable } from '@angular/core';


import {Http} from '@angular/http'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

 
@Injectable()
export class omdbApiService{
    private baseUrl: string ='http://www.omdbapi.com/?apikey=75522b56&';
    private page: string ='&page=';
    private Titre : string="&t=";
    private type: string ='&type=';
    private more:string ='&s=';
    private id:string ='&i=';
  constructor(private http: Http){

  }  
  public getResutat(titre:string) :Promise<ImdbApiGlobal>{
    
   const url=`${this.baseUrl}${this.Titre}${titre}`;
   return this.http.get(url)
   .toPromise()
   .then(response => response.json() )
   .catch(error => console.log('une erreur est servenue'+error))
  }
  public getResutatByimdbID(imdbID:string) :Promise<ImdbApiGlobal>{
    
    const url=`${this.baseUrl}${this.id}${imdbID}`;
    console.log(url);
    return this.http.get(url)
    .toPromise()
    .then(response => response.json() )
    .catch(error => console.log('une erreur est servenue'+error))
   }
}