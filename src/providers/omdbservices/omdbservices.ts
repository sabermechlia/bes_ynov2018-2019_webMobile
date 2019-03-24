import { EpisodeGolbale } from './../../models/Episode-globa';
import { Season } from './../../models/Season.interface';
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
    private Season:string='&Season=';
    private Episode:string='&Episode='
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
   public getDetailEpisode(imdbID:string,Season:string,Episode:string):Promise<EpisodeGolbale>{
    const url=`${this.baseUrl}${this.id}${imdbID}${this.Season}${Season}${this.Episode}${Episode}`;
    console.log(url);
    return this.http.get(url)
    .toPromise()
    .then(response => response.json() )
    .catch(error => console.log('une erreur est servenue'+error))
   }
   public getListeEpisodeBySeason(imdbID:string,Season:number):Promise<Season>{
    const url=`${this.baseUrl}${this.id}${imdbID}${this.Season}${Season}`;
    console.log(url);
    return this.http.get(url)
    .toPromise()
    .then(response => response.json() )
    .catch(error => console.log('une erreur est servenue'+error))
   }
   
  
}