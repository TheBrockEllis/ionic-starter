import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, Events, LoadingController } from 'ionic-angular';

import { RegisterPage } from '../register/register';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { Auth } from '../../providers/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public username:string = "";
  public password:string = "";

  constructor(public nav:NavController, public auth:Auth, public loading:LoadingController, public alert:AlertController, public events:Events){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  /*
  * For production use, switch this dummy function out with the full function below
  */


  attemptLogin(){
    let data = { token: '123456789', name: 'Testy McTesterson'};
    this.events.publish('user:loggedin', data);
  }

  // attemptLogin(){
  //   if(this.username.length == 0 || this.password.length == 0){
  //     let alert = this.alert.create({
  //       title: 'Login Error!',
  //       message: "Please enter both a username and a password.",
  //       buttons: ['OK']
  //     });
  //
  //     alert.present();
  //     return;
  //   }
  //
  //   if(this.password.length < 6){
  //     let alert = this.alert.create({
  //       title: 'Login Error!',
  //       message: "Your password is not a valid length. Must be a minimum of 6 characters.",
  //       buttons: ['OK']
  //     });
  //
  //     alert.present();
  //     return;
  //   }
  //
  //   let loader = this.loading.create({content: "Logging in..."});
  //   loader.present();
  //
  //   this.auth.login(this.username, this.password).then( (data:any) => {
  //
  //     /*
  //      * EVENTS: broadcast to other components of the app that need to know that we're logged in now
  //      */
  //     // The Auth service is listening for this to store the users data
  //     // The app.component is listening for this to change root page
  //     this.events.publish('user:loggedin', data);
  //
  //     // The HTTP service is listening for this to store the access token
  //     this.events.publish('user:authenticated', data);
  //
  //   }).catch(error => {
  //     //console.log("Login error: ", error);
  //
  //     let title = "Login Error", message = "Unable to login. Please try again later.";
  //
  //     if(error.status == 401){
  //       title = "Incorrect login";
  //       message = "Your login attempt failed due to an incorrect username or password";
  //     }else if(error.status == 500){
  //       title = "No organization found";
  //       message = "Your user's domain was not autolinked with a CPR Handbooks organization. If you believe this is in error, please contact us.";
  //     }
  //
  //     this.presentBadLogin(title, message);
  //   }).then( () => {
  //     loader.dismiss();
  //   });
  //
  // }

  presentBadLogin(title, message){
    let alert = this.alert.create({
      title: title,
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }

  registerAccount(){
    this.nav.push(RegisterPage);
  }

  resetPassword(){
    this.nav.push(ResetPasswordPage);
  }

}
