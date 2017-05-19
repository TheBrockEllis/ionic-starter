import { Component } from '@angular/core';
import { Platform, Events, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { User } from '../providers/user';
import { Auth } from '../providers/auth';
import { HTTP } from '../providers/http';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(public app:App, public platform: Platform, public events:Events, public auth:Auth, public user:User, public http:HTTP, public splash:SplashScreen, public status:StatusBar) {

    // the auth provider will publish this event when initialized if the user
    // has a token saved in storage
    this.events.subscribe("user:loggedin", user => {
      this.http.setToken(user.token);
      this.rootPage = HomePage;
    });

    // When user gets logged out, we need to display the login page again
    this.events.subscribe("user:loggedout", () => {
      this.rootPage = LoginPage;
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      status.styleDefault();
      splash.hide();
    });
  }
}
