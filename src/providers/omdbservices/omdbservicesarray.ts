import { OmdbArray } from './../../models/omdb_array.model';
import { Injectable } from '@angular/core';


import {Http} from '@angular/http'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

 
@Injectable()
export class omdbServiceArray{
    private baseUrl: string ='http://www.omdbapi.com/?apikey=75522b56';
    private page: string ='&page=';
    private type: string ='&type=';
    private more:string ='&s=';
    private id:string ='&i=';

  constructor(private http: Http){

  }  
  public getResutatArray(titre:string,idPage:number) :Promise<OmdbArray>{
    
   const url=`${this.baseUrl}${this.more}${titre}${this.page}${idPage}`;
   console.log(url);
   return this.http.get(url)
   .toPromise()
   .then(response => response.json() )
   .catch(error => console.log('une erreur est servenue'+error))
  }
}