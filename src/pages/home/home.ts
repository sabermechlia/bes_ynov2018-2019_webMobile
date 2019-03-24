import { omdbServiceArray } from './../../providers/omdbservices/omdbservicesarray';
import { ImdbApiGlobal } from './../../models/imdbapi-global.model';
import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { omdbApiService } from '../../providers/omdbservices/omdbservices';
import { OmdbArray } from '../../models/omdb_array.model';
import { searchs } from '../../models/searchsmodel';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { DataBaseProvider } from '../../providers/data-dase/data-dase';
DataBaseProvider
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
Type:string;
isSpeechAvailable = false;
isListening = false;
matches: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private omdbApiService:omdbApiService,
    private omdbServiceArray:omdbServiceArray ,
    private speechRecognition: SpeechRecognition,
    private changeDetectorRef: ChangeDetectorRef,
    private maBase:DataBaseProvider) {
      this.Type=this.navParams.get('type');
      console.log("search : "+this.Type);
  }
  PreparationMicro(){
  

      this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        console.log('Droit d\'utiliser la reconnaissance vocale ? : ' + hasPermission);
        this.speechRecognition.isRecognitionAvailable()
         .then((available: boolean) => this.isSpeechAvailable = available)
        if(!hasPermission) {
          this.requestSpeechRecognitionPermission();
        }
        
      });
   
  }
  private requestSpeechRecognitionPermission(): void {
    this.speechRecognition.requestPermission()
    .then(
      () => console.log('Permission accordée !'),
      () => console.log('Permission refusée :/')
    )
  }
  public startListening(): void {
    this.isListening = true;
    this.matches = '';
    
    let options = {
      language: 'fr-FR',
      matches: 1,
      prompt: 'Je vous écoute ! :)',  // Android only
      showPopup: true,                // Android only
      showPartial: false              // iOS only
    }
    this.speechRecognition.startListening(options)
    .subscribe(
      (matches) => {
        this.isListening = false;
        this.titre = matches[0];
        this.searchArray();
        
      },
      (onerror) => {
        this.isListening = false;
        this.changeDetectorRef.detectChanges();
        console.log(onerror);
      }
    )
  }

  public stopListening(): void {
    this.speechRecognition.stopListening();
  }

  SearchVocal():void{

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
      this.omdbServiceArray.getResutatArray(this.titre,this.idPage,this.Type)
      .then(resultatFetched => {
        this.resultats = resultatFetched;
        this.maxpage=this.resultats.totalResults/10;
        this.titre=this.titre;
        this.idPage=1;
        this.tab=this.resultats.Search;
        this.changeDetectorRef.detectChanges();
        console.log("first tab dans le recherche  "+this.tab);
        
      
      })
      .catch(error=>this.error="Pas de connexion internet");
  }
  public upToDateResults(infiniteScroll?)
    { this.omdbServiceArray.getResutatArray(this.titre,this.idPage,this.Type)
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
    this.maBase.isAddedFilm(imdbID)
    .then(res=>{
      let liked=res;
      console.log("home "+liked);
      this.navCtrl.push('DetailsPage',{imdbID:imdbID,posterUrl:this.posterUrl,type:this.Type,liked:liked})
    })
   
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
private addFavorieFilm(id:string){
   
  this.maBase.InsertIntoFilm(id);



}
testImg(src:string)
{ var newSrc=this.no_poster;
  if(src!="N/A")
     newSrc=src;
  return newSrc   
}
}



