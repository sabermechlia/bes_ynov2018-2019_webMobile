import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  NetworkOriginal } from '@ionic-native/network';
@Injectable()
export class ConnectionProvider {

  constructor( private network: NetworkOriginal) {
   
  }
public testConnextion(){
  let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    console.log('network was disconnected :-(');
  });
  disconnectSubscription.unsubscribe();

  let connectSubscription = this.network.onConnect().subscribe(() => {
    console.log('network connected!');
  });
  connectSubscription.unsubscribe();
  
}
}
