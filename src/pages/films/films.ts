import { PopoverComponent } from './../../components/popover/popover';
import { DataBaseProvider } from './../../providers/data-dase/data-dase';

import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController } from 'ionic-angular';
import { ImdbApiGlobal } from './../../models/imdbapi-global.model';
////

@IonicPage()
@Component({
  selector: 'page-films',
  templateUrl: 'films.html',
})
export class FilmsPage {
  tab: ImdbApiGlobal[];
  posterBaseUrl: string ='http://img.omdbapi.com/?apikey=75522b56&h=600&i=';
  posterUrl: string ;
  no_poster='../../assets/imgs/no_poster.jpg';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private popo: PopoverController,
    private maBase: DataBaseProvider,
    private changeDetectorRef:ChangeDetectorRef,
    private  viewCtrl: ViewController
  ) {
      
   
  }
  ionViewDidEnter(){
    this.initTab();
  }
  ionViewWillEnter(){
   
   
    
  }
  ImportExportProp(event) {
    let popover = this.popo.create(PopoverComponent);
    popover.present({
      ev: event
    });

  }
  private initTab() {
   this.tab= this.maBase.SelectAllFilm(this.tab);
   console.log(this.tab.length);
  }
  delete(id,index){
   this.maBase.deleteFav(id)
   .then(()=>{
    this.tab.splice(index,1);
        
   })
  }
  public showDetails(imdbID:string){
    this.posterUrl=this.posterBaseUrl+imdbID;
    this.maBase.isAddedFilm(imdbID)
    .then(res=>{
      let liked=res;
      this.navCtrl.push('DetailsPage',{imdbID:imdbID,posterUrl:this.posterUrl,type:'movie',liked:liked})
    })
   
  }
  

}
