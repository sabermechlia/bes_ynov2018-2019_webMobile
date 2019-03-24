import { EpisodeGolbale } from './../../models/Episode-globa';
import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { omdbApiService } from '../../providers/omdbservices/omdbservices';

@Component({
  selector: 'episode',
  templateUrl: 'episode.html'
})
export class EpisodeComponent {

  episode:EpisodeGolbale;
  id:string;
  posterUrl:string;
  episodeId:string;
  seasonid:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private omdbApiService:omdbApiService) {
    this.id=this.navParams.get('id');
    this.episodeId=this.navParams.get('episodeId');
    this.seasonid=this.navParams.get('seasonid');
    this.omdbApiService.getDetailEpisode(this.id,this.seasonid,this.episodeId)
    .then(resultat=>this.episode=resultat);
  }

  

}
