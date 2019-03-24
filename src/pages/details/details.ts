import { DataBaseProvider } from './../../providers/data-dase/data-dase';
import { YoutubeServiceProvider } from './../../providers/youtube-service/youtube-service';
import { omdbApiService } from './../../providers/omdbservices/omdbservices';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController,PopoverController,LoadingController,Loading, AlertController, Alert } from 'ionic-angular';
import { ImdbApiGlobal } from './../../models/imdbapi-global.model';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

 

@IonicPage() 
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
}) 
export class DetailsPage {
  resultat : ImdbApiGlobal;
  posterUrl: string 
  type:string;
  imdbID:string;
  video;
  public liked;
  loader    : Loading;
  storageDirectory: string = '';
  no_poster='../../assets/imgs/no_poster.jpg';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private omdbApiService:omdbApiService,
              private modal:ModalController,
              private popo:PopoverController,
              public youtubeVideo :YoutubeVideoPlayer,
              private youtube:YoutubeServiceProvider,
              private maBase:DataBaseProvider,
              public loadingCtrl: LoadingController,
              private transfer: FileTransfer,
              private file: File ) {
                
    
  }
  private presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
    this.presentLoading();
    this.imdbID=this.navParams.get('imdbID');
    this.posterUrl=this.navParams.get('posterUrl');
    this.type=this.navParams.get('type');
    this.liked=this.navParams.get('liked');
    console.log("detail "+this.liked)
    this.omdbApiService.getResutatByimdbID(this.imdbID)
    .then(resultatFetched => {
      this.resultat = resultatFetched;
      this.youtube.VideoVfSearch(this.resultat.Title).then(
        data=>this.video=data.items[0]
        )
      
      this.loader.dismiss()
    });
    
  }
  openMoreDetail(){
    const myModel=this.modal.create('MoreDetailPage',{id:this.imdbID});
    myModel.present();
  }
  addFavorieFilm(imdbID:string){
     this.liked=true;
     this.maBase.InsertIntoFilm(imdbID)
  }
  deleteFavorieFilm(imdbID:string){
    this.liked=false;
    this.maBase.deleteFav(imdbID);
  }
 
  download() {
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = this.posterUrl;
    let dir = 'Download';
    let nameFile = this.imdbID+'.jpg'
    let resul = this.file.createDir(this.file.externalRootDirectory, dir, true);
    resul.then(
      (data) => {
        fileTransfer.download(url, data.toURL() + nameFile).then((entry) => {
          console.log('download complete: ' + entry.toURL());
          alert('download complete: '+dir+'/'+nameFile )
        }, (error) => {
          
        });
      }
    ).catch(e => console.log(e))

  
  }
   
}
