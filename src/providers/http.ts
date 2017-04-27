import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Platform, Events } from 'ionic-angular';
//import { Observable } from 'rxjs/Observable';
import { Network } from '@ionic-native/network';
import 'rxjs/add/operator/map';

@Injectable()
export class HTTP {
  public online:boolean = true;
  public base:string; // this will be set in the constructor based on if we're in dev or prod
  public token:string = null;

  constructor(public platform:Platform, public http: Http, public events:Events, private network:Network) {
    if(document.URL.includes('https://') || document.URL.includes('http://')){
      this.base = "http://mbb.lvh.me:3001/";
    } else {
      this.base = "ADDURLHERESOMEDAY";
    }

    this.platform.ready().then(() => {
      let type = this.network.type;

      //console.log("Connection type: ", this.network.type);
      // Try and find out the current online status of the device
      if(type == "unknown" || type == "none" || type == undefined){
        //console.log("The device is not online");
        this.online = false;
      }else{
        //console.log("The device is online!");
        this.online = true;
      }
    });

    // Must listen for disconnection and connection events to update the online status
    this.network.onDisconnect().subscribe( () => {
      this.online = false;
      //console.log('network was disconnected :-(');
    });

    this.network.onConnect().subscribe( () => {
      this.online = true;
      //console.log('network was connected :-)');
    });

    // When the user gets successfully authenticated, save the access token
    // on this class, as this is the only class that will need it
    this.events.subscribe('user:authenticated', user => {
      this.token = user.token;
    });
  }

  setToken(token){
    this.token = token;
  }

  get(endpoint, forceUpdate = false){
    let url = this.base + endpoint + ".json";

    var headers = new Headers();
    headers.append('Authorization', 'Token ' + "token=" + this.token );
    headers.append("Content-Type", 'application/json');

    return this.http.get(url, { headers: headers }).map(res => res.json()).toPromise();
  }

 post(endpoint, data){
   let url = this.base + endpoint + ".json";

   var headers = new Headers();

   headers.append('Authorization', 'Token ' + "token="+this.token );
   headers.append("Content-Type", 'application/json');

   return this.http.post(url, data, { headers: headers }).map(res => res.json()).toPromise();
 }

}
