import { ImdbApiGlobal } from './../../models/imdbapi-global.model';
import { Component } from '@angular/core';
import { NavController  } from 'ionic-angular';
import { omdbApiService } from '../../providers/omdbservices/omdbservices';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
resultat : ImdbApiGlobal = new ImdbApiGlobal() ;
  constructor(public navCtrl: NavController, private omdbApiService:omdbApiService) {
    this.omdbApiService.getResutat()
    .then(resultatFetched => {
      this.resultat = resultatFetched;
      console.log(this.resultat);

    });
  }
  
}