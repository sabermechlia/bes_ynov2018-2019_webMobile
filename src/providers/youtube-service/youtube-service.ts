import { Http } from '@angular/http';
import { YoutubeGlobal } from './../../models/youtube/youtube-global.model';
import { Injectable } from '@angular/core';

@Injectable()
export class YoutubeServiceProvider {
    private baseUrl: string ='https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&key=';
    private Key: string ='yourKey';
    private q: string ='&q=';
    private chanelID:string='&channelId=UClgRkhTL3_hImCAmdLfDE4g'
  constructor(public http: Http) {
    
  }
  public VideoVfSearch(titre:string) :Promise<YoutubeGlobal>{
    
    const url=`${this.baseUrl}${this.Key}${this.q}${titre}`;
    console.log(url);
    return this.http.get(url)
    .toPromise()
    .then(response => response.json() )
    .catch(error => console.log('une erreur est servenue'+error))
   }
   public getPhoto(titre:string){
     var urlimg='null';
     this.VideoVfSearch(titre)
    .then(response=> 
      urlimg= response.items[0].snippet.thumbnails.high.url )
      return urlimg;
   }
    

}
