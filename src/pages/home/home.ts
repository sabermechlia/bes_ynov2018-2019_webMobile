import { ImdbApiGlobal } from './../../models/imdbapi-global.model';
import { Component } from '@angular/core';
import { NavController, Nav  } from 'ionic-angular';
import { omdbApiService } from '../../providers/omdbservices/omdbservices';

import { OmdbArray } from '../../models/omdb_array.model';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
resultat : ImdbApiGlobal = new ImdbApiGlobal() ;

  constructor(public navCtrl: NavController, private omdbApiService:omdbApiService) {
    this.omdbApiService.getResutat('The Dark Knight')
    .then(resultatFetched => {
      this.resultat = resultatFetched;
      console.log(this.resultat);

    });
  }
  public search(titre: string)
  {
    this.omdbApiService.getResutat(titre)
    .then(resultatFetched => {
      this.resultat = resultatFetched;
      console.log(this.resultat);

    });
  }
  public showDetails(){
   
    this.navCtrl.push('DetailsPage',{resultat:this.resultat})
  }
  
}