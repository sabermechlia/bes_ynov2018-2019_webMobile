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
  resultat : ImdbApiGlobal
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.resultat=navParams.get('resultat');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}
