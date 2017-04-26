import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class User {
  public userData:any = null;

  constructor(public storage:Storage, public events:Events) {
    this.getUser();

    this.events.subscribe('user:loggedin', user => {
      //console.log("User service setting user!", user);
      this.setUser(user);
    });
  }

  getUser(){
    if(this.userData){
      //console.log("Hot loading user data");
      return Promise.resolve(this.userData);
    }

    return this.storage.get('userData').then( data => {
      //console.log("This is the data pulled from the user storage", data);
      if(data) this.userData = data;
      else this.userData = {};
      return Promise.resolve(data);
    });
  }

  setUser(user){
    this.userData = user;

    return this.storage.set('userData', user).then( res => {
      return Promise.resolve(user);
    });
  }

}
