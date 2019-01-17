import { omdbServiceArray } from './../../providers/omdbservices/omdbservicesarray';
import { ImdbApiGlobal } from './../../models/imdbapi-global.model';
import { Component } from '@angular/core';
import { NavController, Nav  } from 'ionic-angular';
import { omdbApiService } from '../../providers/omdbservices/omdbservices';
import { OmdbArray } from '../../models/omdb_array.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
resultat : ImdbApiGlobal = new ImdbApiGlobal() ;
resultats:OmdbArray =new OmdbArray();
posterBaseUrl: string ='http://img.omdbapi.com/?apikey=75522b56&h=600&i=';
posterUrl: string ;
imdbID:string
titre:string;
maxpage=1;
private idPage:number=1;
  constructor(public navCtrl: NavController, private omdbApiService:omdbApiService,private omdbServiceArray:omdbServiceArray ) {
    this.titre='speed';
    this.idPage=1;
    this.searchArray(this.titre);
  }
  public search(titre: string)
  {
    this.omdbApiService.getResutat(titre)
    .then(resultatFetched => {
      this.resultat = resultatFetched;
      console.log(this.resultat);

    });
  }
    public searchArray(titre: string)
    {
      this.omdbServiceArray.getResutatArray(titre,this.idPage)
      .then(resultatFetched => {
        this.resultats = resultatFetched;
        console.log(this.resultats);
        this.maxpage=this.resultats.totalResults/10;
        this.titre=titre;
        this.idPage=1;
      });
  }
  public upToDateResults(infiniteScroll?)
    {
      this.omdbServiceArray.getResutatArray(this.titre,this.idPage)
      .then(resultatFetched => {
        this.resultats = resultatFetched;
        console.log(this.resultats);
        if(infiniteScroll)
        {
          infiniteScroll.complete();
        }
      });
  }
  public showDetails(imdbID:string){
    this.posterUrl=this.posterBaseUrl+imdbID;
    console.log( this.posterUrl);
    this.navCtrl.push('DetailsPage',{imdbID:imdbID,posterUrl:this.posterUrl})
  }
  loadMore(infiniteScroll){
    this.idPage++;
    this.upToDateResults(infiniteScroll)
    if(this.idPage===this.maxpage ||this.idPage > this.maxpage  ){
    infiniteScroll.enable(false);
    }
}
}