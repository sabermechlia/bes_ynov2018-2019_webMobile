import { DataBaseProvider } from './../providers/data-dase/data-dase';
import { TabsPage } from './../pages/tabs/tabs';
import { FilmsPage } from './../pages/films/films';
import { Component,ViewChild } from '@angular/core';
import {Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IndexPage } from '../pages/index';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = TabsPage;

  // constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
  //   platform.ready().then(() => {
  //     // Okay, so the platform is ready and our plugins are available.
  //     // Here you can do any higher level native things you might need.
  //     statusBar.styleDefault();
  //     splashScreen.hide();
  //   });
  // }
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public maBase:DataBaseProvider) {
    this.initializeApp();
  
    // // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Accueil', component: TabsPage },
      { title: 'Favoris', component: FilmsPage },
     
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      this.maBase.initMaBase();
      
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

