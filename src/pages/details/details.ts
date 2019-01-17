import { omdbApiService } from './../../providers/omdbservices/omdbservices';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImdbApiGlobal } from './../../models/imdbapi-global.model';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  resultat : ImdbApiGlobal;
  posterUrl: string 
  imdbID:string
  constructor(public navCtrl: NavController, public navParams: NavParams,private omdbApiService:omdbApiService) {
    this.imdbID=navParams.get('imdbID');
    this.posterUrl=navParams.get('posterUrl');
    console.log(this.imdbID);
    this.omdbApiService.getResutatByimdbID(this.imdbID)
    .then(resultatFetched => {
      this.resultat = resultatFetched;
      console.log(this.resultat);

    });
    console.log(this.posterUrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}
