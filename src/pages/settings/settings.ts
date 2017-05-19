import { Component } from '@angular/core';
import { NavController, NavParams, Events} from 'ionic-angular';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public nav:NavController, public params:NavParams, public events:Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Settings');
  }

  attemptLogout(){
    // this will trigger things all over the app
    this.events.publish('user:loggedout');
  }

}
