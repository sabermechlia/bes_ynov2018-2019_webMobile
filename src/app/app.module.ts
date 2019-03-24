
import { EpisodeComponent } from './../components/episode/episode';
import { SocialSharing } from '@ionic-native/social-sharing';
import { PopoverComponent } from './../components/popover/popover';
import { IndexSeriePage } from './../pages/index-serie/index-serie';
import { FilmsPage } from './../pages/films/films';
import { omdbServiceArray } from './../providers/omdbservices/omdbservicesarray';
import { omdbApiService } from './../providers/omdbservices/omdbservices';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { IndexPage } from '../pages/index';
import { NewsApiProvider } from '../providers/news-api/news-api';
import { YoutubeServiceProvider } from '../providers/youtube-service/youtube-service';
import { BrowserModule } from '@angular/platform-browser';
import { DataBaseProvider } from '../providers/data-dase/data-dase';
import { TabsPage } from '../pages/tabs/tabs';
import { IndexFilmPage } from '../pages/index-film/index-film';

import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
// Native components
import { Geolocation } from '@ionic-native/geolocation';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import{GoogleMaps} from '@ionic-native/google-maps'
import{File} from '@ionic-native/file'
import{FileChooser} from '@ionic-native/file-chooser'
import{FilePath} from '@ionic-native/file-path'
import { FileTransfer } from '@ionic-native/file-transfer';
@NgModule({
  declarations: [
    MyApp,
    IndexPage,
   
    FilmsPage,
    TabsPage,
    IndexFilmPage,
    IndexSeriePage,
    PopoverComponent,
    EpisodeComponent
    
    
  ],
  imports: [
    HttpModule, 
    BrowserModule,
    IonicModule.forRoot(MyApp),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IndexPage,
   
    FilmsPage,
    TabsPage,
    IndexFilmPage,
    IndexSeriePage,
    PopoverComponent,
    EpisodeComponent
    
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    omdbApiService,
    omdbServiceArray,
    NewsApiProvider,
    YoutubeServiceProvider,
    DataBaseProvider,
    SQLite,
    GoogleMaps,
    Geolocation,
    SpeechRecognition,
    YoutubeVideoPlayer,
    File,
    FileChooser,
    FilePath,
    SocialSharing,
    FileTransfer
    
  
  ]
})
export class AppModule {}
