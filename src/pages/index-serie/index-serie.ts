
import { DataBaseProvider } from './../../providers/data-dase/data-dase';
import { imdbYoutube } from './../../models/imdbYoutube/imdbYoutube.model';
import { YoutubeServiceProvider } from './../../providers/youtube-service/youtube-service';
import { NewsApiProvider } from './../../providers/news-api/news-api';
import { omdbApiService } from './../../providers/omdbservices/omdbservices';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController,ToastController } from 'ionic-angular';
import { ImdbApiGlobal } from '../../models/imdbapi-global.model';
import { newsApiGlobal } from '../../models/newsapi-global.model';

@IonicPage()
@Component({
  selector: 'page-index-serie',
  templateUrl: 'index-serie.html',
})
export class IndexSeriePage {
  news: newsApiGlobal = new newsApiGlobal();
  resultat: ImdbApiGlobal;
  arrayFilms:string[]=[' '];
  topFive: ImdbApiGlobal[];
  posterBaseUrl: string = 'http://img.omdbapi.com/?apikey=75522b56&h=600&i=';
  posterUrl: string;
  imdbID: string
  no_poster = '../../assets/imgs/no_poster.jpg';
  titreTopFive = ['Planet Earth II', '	Frères d\'armes', 'Game of Thrones', 'The Umbrella Academy', 'True Detective '];
  imdbyoutube: imdbYoutube;
  array=[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private omdbApiService: omdbApiService,
    private newsApi: NewsApiProvider,
    public loadingCtrl: LoadingController,
    public youtube: YoutubeServiceProvider,
    public menu :MenuController,
    public maBase:DataBaseProvider,
    public toastController: ToastController
    ) {
 
    this.initTopFive();
    this.initNews();
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  initNews() {
    this.newsApi.getArticlesNews()
      .then(resultatFetched => {
        this.news = resultatFetched
        console.log(this.news);
      })
      .catch(error => console.log(error))

  }
  initTopFive() {
    for (var i = 0; i < 5; i++) {
      this.omdbApiService.getResutat(this.titreTopFive[i])
      .then(resultatFetched => {
        this.resultat = resultatFetched;
        this.array.push(this.resultat);
      });
      
    }
    
  }



  public showDetails(imdbID: string) {
    this.posterUrl=this.posterBaseUrl+imdbID;
    this.maBase.isAddedFilm(imdbID)
    .then(res=>{
      let liked=res;
      console.log("home "+liked);
      this.navCtrl.push('DetailsPage',{imdbID:imdbID,posterUrl:this.posterUrl,type:"series",liked:liked})
    })
  }

  testImg(src: string) {
    var newSrc = this.no_poster;
    if (src != "N/A")
      newSrc = src;
    return newSrc
  }

  ionViewDidLoad() {

  }
  public searchPage() {
    this.navCtrl.push('HomePage',{type:'series'});
  }
  private startPage(): void {
    {
      let loading = this.loadingCtrl.create({

        content: 'Please wait...'

      });

      loading.present();

      setTimeout(() => {
        loading.dismiss();
      }, 1000,
      );
    }
  }
  private addFavorieFilm(id:string){
   
      this.maBase.InsertIntoFilm(id);
 
   
   
  }
  private isLikedFilm(id:string):Promise<boolean>{
    return this.maBase.isAddedFilm(id);
  }
  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
