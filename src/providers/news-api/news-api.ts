import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { newsApiGlobal } from '../../models/newsapi-global.model';
@Injectable()
export class NewsApiProvider {
  private baseUrl: string ='https://newsapi.org/v2/';
  private requette: string ='film';
  private type="top-headlines";
  private source: string ='google-news-fr';
  private apikey:string ='0d65e41db1634b60bf1884d0bd517136';
  constructor(public http: Http) {
    console.log('Hello NewsApiProvider Provider');
  }
public getArticlesNews():Promise<newsApiGlobal>{
const url=`${this.baseUrl}${this.type}?q=${this.requette}&apiKey=${this.apikey}`;
console.log(url);
return this.http.get(url)
.toPromise()
.then(response=>response.json())
.catch(error=> console.log("une erreur survenu "+error))
}
}
