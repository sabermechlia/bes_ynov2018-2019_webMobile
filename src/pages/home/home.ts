import { omdbServiceArray } from './../../providers/omdbservices/omdbservicesarray';
import { ImdbApiGlobal } from './../../models/imdbapi-global.model';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { omdbApiService } from '../../providers/omdbservices/omdbservices';
import { OmdbArray } from '../../models/omdb_array.model';
import { searchs } from '../../models/searchsmodel';


@IonicPage()
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
tab:searchs[]=null;
error:string;
TabGauche:searchs[];
TabDroite:searchs[];
no_poster='../../assets/imgs/no_poster.jpg';
private idPage:number=1;
  constructor(public navCtrl: NavController, private omdbApiService:omdbApiService,private omdbServiceArray:omdbServiceArray ) {
  
  }
  public search(titre: string)
  {
    this.omdbApiService.getResutat(titre)
    .then(resultatFetched => {
      this.resultat = resultatFetched;
     
      console.log(this.resultat);

    });
  }
    public searchArray()
    {  this.tab=null;
      this.omdbServiceArray.getResutatArray(this.titre,this.idPage)
      .then(resultatFetched => {
        this.resultats = resultatFetched;
        console.log(this.resultats);
        this.maxpage=this.resultats.totalResults/10;
        this.titre=this.titre;
       this.idPage=1;
       this.tab=this.resultats.Search;
       var m=this.tab.length/2;
       var max=this.tab.length;
       this.TabGauche.slice(0,m);
       this.TabDroite.slice(m,max);
       console.log("first tab dans le recherche  "+this.tab);
      })
      .catch(error=>this.error="Pas de connexion internet");
  }
  public upToDateResults(infiniteScroll?)
    { this.omdbServiceArray.getResutatArray(this.titre,this.idPage)
      .then(resultatFetched => {
        this.resultats = resultatFetched;
        console.log(this.resultats);
        this.tab.concat(this.resultats.Search);
        this.addToListe();
        
        if(infiniteScroll)
        {
          infiniteScroll.complete();
        }
      })
      .catch(error=>this.error="Pas de connexion internet");
  }
  private addToListe(){
      var lastIndex=this.tab.length;
        for(var i=0;i<9;i++){
         this.tab[lastIndex+i]=this.resultats.Search[i];
        }

  }
  public showDetails(imdbID:string){
    this.posterUrl=this.posterBaseUrl+imdbID;
    console.log( this.posterUrl);
    this.navCtrl.push('DetailsPage',{imdbID:imdbID,posterUrl:this.posterUrl})
  }


loadMore(infiniteScroll): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      this.idPage++;
      this.upToDateResults(infiniteScroll);   
      if(this.idPage===this.maxpage ||this.idPage > this.maxpage  )
      {
         infiniteScroll.enable(false);
      }
     
      resolve();
    }, 500);
  })
}
testImg(src:string)
{ var newSrc=this.no_poster;
  if(src!="N/A")
     newSrc=src;
  return newSrc   
}
}



