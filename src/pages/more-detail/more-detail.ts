import { Season } from './../../models/Season.interface';
import { ImdbApiGlobal } from './../../models/imdbapi-global.model';
import { Component } from '@angular/core';
import { IonicPage, ViewController, PopoverController, NavParams, NavController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';
import { omdbApiService } from '../../providers/omdbservices/omdbservices';
import { EpisodeComponent } from '../../components/episode/episode';




@IonicPage()
@Component({
  selector: 'page-more-detail',
  templateUrl: 'more-detail.html',
})
export class MoreDetailPage {
  id:string;
  allSeasonDetail:Season[]=[];
  tab:ImdbApiGlobal;
  nbSeason:number;
  nb:Season;
  constructor(private view: ViewController,
              private popo:PopoverController,
              private NavParams:NavParams,
              private omdbApiService:omdbApiService,
              private NavController:NavController) {
  this.id=this.NavParams.get('id');
  this.omdbApiService.getResutatByimdbID(this.id)
    .then(resultatFetched => {
      this.tab = resultatFetched;
      this.nbSeason=parseInt( this.tab.totalSeasons);
      console.log(this.nbSeason);
      this.ListeEpisodeAndSeason( this.nbSeason);
    });
 
 
  }
   
   
  ionViewDidLoad() {
    
  }
  closeModel(){
    this.view.dismiss();
  }
  presentPopover(id:string,Season:string) {
    let popover =  this.popo.create(PopoverComponent,{id:id,Season:Season});
   popover.present();
  }
  affichermasquer(idDiv:number){
    var divInfo = document.getElementById(idDiv+'');
    
    if (divInfo.style.display == 'none'){
      divInfo.style.display = 'block';
    }
    
    else{
      divInfo.style.display = 'none';
    }
    
    
    }
   
    ListeEpisodeAndSeason(nb:number)
    {  let Promises=[];
      for(var i=1;i<=nb;i++)
            Promises.push(this.omdbApiService.getListeEpisodeBySeason(this.id,i));
      Promise.all(Promises)
      .then(res=>this.allSeasonDetail=res)      
    }
    showEpisode(Episode:string,Season:string){
     
      let popover = this.popo.create(EpisodeComponent,{id:this.id,episodeId:Episode,seasonid:Season},{cssClass: 'custom-popover'});
       popover.present();


    }
}
