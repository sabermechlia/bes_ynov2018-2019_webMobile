import { NewsApiProvider } from './../../providers/news-api/news-api';
import { omdbApiService } from './../../providers/omdbservices/omdbservices';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImdbApiGlobal } from '../../models/imdbapi-global.model';
import { newsApiGlobal } from '../../models/newsapi-global.model';


@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
  news:newsApiGlobal=new newsApiGlobal();
  resultat : ImdbApiGlobal;
  topFive:ImdbApiGlobal[];
  posterBaseUrl: string ='http://img.omdbapi.com/?apikey=75522b56&h=600&i=';
  posterUrl: string ;
  imdbID:string
  no_poster='../../assets/imgs/no_poster.jpg';
  titreTopFive = ['The Upside', '	Aquaman','A Dog\'s Way Home','Spider-Man: Into the Spider-Verse','Escape Room'];
  arrays=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private omdbApiService:omdbApiService,private newsApi:NewsApiProvider) {
  this.initTopFive();
  this.initNews();
  }
  initNews()
  {
   this.newsApi.getArticlesNews()
   .then(resultatFetched => {
     this.news=resultatFetched
    console.log(this.news);
    })
   .catch(error=>console.log(error))
   
  }
initTopFive()
{     
     for(var i=0;i<5;i++)
  { this.omdbApiService.getResutat(this.titreTopFive[i])
    .then(resultatFetched => {
      this.resultat= resultatFetched;
      this.arrays.push(this.resultat);
    });
   
  }
  
}



public showDetails(imdbID:string){
  this.posterUrl=this.posterBaseUrl+imdbID;
  this.navCtrl.push('DetailsPage',{imdbID:imdbID,posterUrl:this.posterUrl})
}

testImg(src:string)
{ var newSrc=this.no_poster;
  if(src!="N/A")
     newSrc=src;
  return newSrc   
}

  ionViewDidLoad() {
    
  }
  searchPage(){
    this.navCtrl.push('HomePage');
  }
}
