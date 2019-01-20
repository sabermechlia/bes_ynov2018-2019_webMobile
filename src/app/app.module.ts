
import { omdbServiceArray } from './../providers/omdbservices/omdbservicesarray';
import { omdbApiService } from './../providers/omdbservices/omdbservices';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { IndexPage } from '../pages/index';
import { NewsApiProvider } from '../providers/news-api/news-api';

@NgModule({
  declarations: [
    MyApp,
    IndexPage,
    
  ],
  imports: [
    HttpModule, 
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IndexPage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    omdbApiService,
    omdbServiceArray,
    NewsApiProvider
  ]
})
export class AppModule {}
