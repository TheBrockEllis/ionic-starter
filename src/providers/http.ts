import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Platform, Events } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Network } from '@ionic-native/network';
import 'rxjs/add/operator/map';

@Injectable()
export class HTTP {
  public online:boolean = true;
  public base:string; // this will be set in the constructor based on if we're in dev or prod
  public token:string = null;

  constructor(public platform:Platform, public http: Http, public events:Events, private network:Network) {
    if(document.URL.includes('https://') || document.URL.includes('http://')){
      this.base = "http://127.0.0.1:3001/";
    } else {
      this.base = "https://handbooks.cprmedicine.com/";
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

  clearCache(){
    return this.cache.clearAll();
  }

  get(endpoint, forceUpdate = false){
    let url = this.base + endpoint + ".json";
    let cacheKey = url;

    // delayType = all will send new request to server everytime,
    // if it's set to none it will send new request only when entry is expired
    //let delayType = 'all';
    //let ttl = 60 * 60;

    var headers = new Headers();
    headers.append('Authorization', 'Token ' + "token=" + this.token );
    headers.append("Content-Type", 'application/json');

    //console.log("About to look up " + cacheKey);

    if(forceUpdate){

      /* LETS GO RIGHT TO THE SERVER TO GET A LIVE RECORD */
      //console.log("LETS GO RIGHT TO THE SERVER TO GET A LIVE RECORD");

      return this.http.get(url, { headers: headers }).map(res => res.json()).toPromise().then(result => {
        //console.log("Live records: ", result);
        return this.cache.saveItem(cacheKey, result);
      });

    }else{

      /* LETS GET A CACHED COPY/FETCH A NEW COPY */
     //console.log("LETS GET A CACHED COPY/FETCH A NEW COPY");

     return this.cache.getItem(cacheKey).catch(() => {
       // fall here if item is expired or doesn't exist

       //console.log("Trying to access " + cacheKey + " but it doesn't exist!");

       // we'l attempt to get the content from the API if we have network access
       if(this.online){

         return this.http.get(url, { headers: headers }).map(res => res.json()).toPromise().then(result => {
           return this.cache.saveItem(cacheKey, result);
         });

       } else {

         // nothing we can really do if you don't have data cached and there's no network...
         return Promise.reject('offline');

       }

     }).then( (data:any) => {
       //console.log("Returning data from cache: ", data);
       return Promise.resolve(data);
     });

   }

 }

 post(endpoint, data){
   let url = this.base + endpoint + ".json";

   var headers = new Headers();

   headers.append('Authorization', 'Token ' + "token="+this.token );
   headers.append("Content-Type", 'application/json');

   return this.http.post(url, data, { headers: headers }).map(res => res.json()).toPromise();
 }

}
