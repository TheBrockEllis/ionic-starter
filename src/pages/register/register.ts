import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';

import { Auth } from '../../providers/auth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public email:string = "";
  public password:string = "";
  public confirmation:string = "";

  constructor(public nav:NavController, public loading:LoadingController, public auth:Auth, public alert:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
  }

  submitRegistration(){

    // check for password match
    if(this.password != this.confirmation){
      let alert = this.alert.create({
        title: 'Registration Error!',
        message: "Password do not match",
        buttons: ['OK']
      });

      alert.present();
      return;
    }

    // check password length
    if(this.password.length < 6 || this.confirmation.length < 6){
      let alert = this.alert.create({
        title: 'Registration Error!',
        message: "Password is not long enough (6 character minimum)",
        buttons: ['OK']
      });

      alert.present();
      return;
    }

    let loading = this.loading.create({content: "Registering..."});
    loading.present();

    let data = {
      email: this.email,
      password: this.password,
      confirmation: this.confirmation
    }

    this.auth.register(data).then( (result:any) => {
      //console.log("Successful registration: ", result);

      let alert = this.alert.create({
        title: 'Registration Successful!',
        message: "A confirmation email has been sent to your email address. Please follow the instructions in the email to finish your registration.",
        buttons: [
          {
            text: "OK",
            handler: () => {
              this.nav.pop();
            }
          }
        ]
      });

      alert.present();
    }).catch( (error:any) => {
      let e:any = JSON.parse(error._body);
      //console.log("Registration error caught: ", e.errors);
      e = e.errors;

      //lets keep track of what errors we have for the registration
      let errors:any = [];

      // errors with the password
      if(e.password){
        errors.push("Password " + e.password[0] )
      }

      //errors with the email
      if(e.email){
        errors.push("Email " + e.email[0] )
      }

      //console.log(errors);

      if(errors.length > 0){
        let message:string = "";

        for(let i=0; i < errors.length; i++){
          message += "<p>" + errors[i] + "</p>";
        }

        let alert = this.alert.create({
          title: 'Registration Error!',
          message: message,
          buttons: ['OK']
        });

        alert.present();
      }

    }).then( () => {
      loading.dismiss();
    });

  }

}
