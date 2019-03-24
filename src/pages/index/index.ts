import { CinemaMap } from './../../models/cinema.mapping';
import { CinemaMappingMock } from '../../models/cinema.mapping';
import { DataBaseProvider } from './../../providers/data-dase/data-dase';
import { imdbYoutube } from './../../models/imdbYoutube/imdbYoutube.model';
import { YoutubeServiceProvider } from './../../providers/youtube-service/youtube-service';
import { Component } from '@angular/core';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapsAnimation, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { IonicPage, NavController, NavParams, LoadingController, MenuController, ToastController, Platform } from 'ionic-angular';
import { ImdbApiGlobal } from '../../models/imdbapi-global.model';
import { newsApiGlobal } from '../../models/newsapi-global.model';
import * as CinemaMapping from '../../models/cinema.mapping';
import { Geolocation } from '@ionic-native/geolocation';

const MARKER_SIZE = 30;
@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})

export class IndexPage {
  private cinemas:CinemaMapping.CinemaMap[]=[];
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
   
    public loadingCtrl: LoadingController,
    public youtube: YoutubeServiceProvider,
    public menu: MenuController,
    public maBase: DataBaseProvider,
    public toastController: ToastController,
    private googleMaps: GoogleMaps,
    public platform: Platform,
    private geoLocation: Geolocation
  ) {
    this.cinemas = CinemaMapping.CinemaMappingMock;
    



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
        
          for (var cinema of this.cinemas) {
            this.addMarkerOnMap(cinema);
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

  private addMarkerOnMap(cinema: CinemaMapping.CinemaMap) {
    // create LatLng object
    let markerPosition: LatLng = new LatLng(cinema.lat, cinema.lng);

    let markerIcon = {
      
      'size': {
        width: Math.round(MARKER_SIZE),
        height: Math.round(MARKER_SIZE)
      }
    }
    let markerOptions: MarkerOptions = {
      position: markerPosition,
      title: cinema.name,
      animation: GoogleMapsAnimation.DROP,
      icon: markerIcon
    };

    this.map.addMarker(markerOptions)
      .then((marker: Marker) => {
        marker.showInfoWindow();
      });

  }
}
