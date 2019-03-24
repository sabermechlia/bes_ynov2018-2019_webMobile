
import { DataBaseProvider } from './../../providers/data-dase/data-dase';
import { imdbYoutube } from './../../models/imdbYoutube/imdbYoutube.model';
import { YoutubeServiceProvider } from './../../providers/youtube-service/youtube-service';
import { NewsApiProvider } from './../../providers/news-api/news-api';
import { omdbApiService } from './../../providers/omdbservices/omdbservices';
import { Component } from '@angular/core';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapsAnimation, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { IonicPage, NavController, NavParams, LoadingController, MenuController, ToastController, Platform } from 'ionic-angular';
import { ImdbApiGlobal } from '../../models/imdbapi-global.model';
import { newsApiGlobal } from '../../models/newsapi-global.model';
import * as TreeMapping from '../../models/tree.mapping';
import { Geolocation } from '@ionic-native/geolocation';

const MARKER_SIZE = 30;
@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})

export class IndexPage {
  private trees: TreeMapping.TreeMap[] = [];
  public map: GoogleMap;
  news: newsApiGlobal = new newsApiGlobal();
  resultat: ImdbApiGlobal;
  arrayFilms: string[] = [' '];
  topFive: ImdbApiGlobal[];
  posterBaseUrl: string = 'http://img.omdbapi.com/?apikey=75522b56&h=600&i=';
  posterUrl: string;
  imdbID: string
  no_poster = '../../assets/imgs/no_poster.jpg';
  titreTopFive = ['The Upside', '	Aquaman', 'A Dog\'s Way Home', 'Spider-Man: Into the Spider-Verse', 'Escape Room'];
  imdbyoutube: imdbYoutube;
  array = [];
  userPosition: LatLng;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private omdbApiService: omdbApiService,
    private newsApi: NewsApiProvider,
    public loadingCtrl: LoadingController,
    public youtube: YoutubeServiceProvider,
    public menu: MenuController,
    public maBase: DataBaseProvider,
    public toastController: ToastController,
    private googleMaps: GoogleMaps,
    public platform: Platform,
    private geoLocation: Geolocation
  ) {
    this.trees = TreeMapping.TreeMappingMock;
    



  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  testImg(src: string) {
    var newSrc = this.no_poster;
    if (src != "N/A")
      newSrc = src;
    return newSrc
  }
  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap() {

    let element: HTMLElement = document.getElementById('Maps');
    this.map = this.googleMaps.create(element);
    
    
    this.map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        console.log('Map is ready!');
        this.getGeoLocation();
        
          for (var tree of this.trees) {
            this.addMarkerOnMap(tree);
          }
       

        
      
        
      }
    );

  }
  getGeoLocation() {

     this.geoLocation.getCurrentPosition().then((resp) => {
      this.userPosition = new LatLng(resp.coords.latitude, resp.coords.longitude);
      console.log(this.userPosition);

      let position: CameraPosition<LatLng> = {
        target: this.userPosition,
        zoom: 18,
        tilt: 30,

      };

      this.map.moveCamera(position);

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  private addMarkerOnMap(tree: TreeMapping.TreeMap) {
    // create LatLng object
    let markerPosition: LatLng = new LatLng(tree.lat, tree.lng);

    let markerIcon = {
      'url': tree.globalImage,
      'size': {
        width: Math.round(MARKER_SIZE),
        height: Math.round(MARKER_SIZE)
      }
    }
    let markerOptions: MarkerOptions = {
      position: markerPosition,
      title: tree.name,
      animation: GoogleMapsAnimation.DROP,
      icon: markerIcon
    };

    this.map.addMarker(markerOptions)
      .then((marker: Marker) => {
        marker.showInfoWindow();
      });

  }
}
