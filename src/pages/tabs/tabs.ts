import { FilmsPage } from './../films/films';
import { IndexSeriePage } from './../index-serie/index-serie';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IndexPage } from '../index';
import { IndexFilmPage } from '../index-film/index-film';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root = IndexPage;
  tab2Root = IndexFilmPage;
  tab3Root = IndexSeriePage;
  tab4Root = FilmsPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
