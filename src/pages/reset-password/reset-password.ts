import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';

import { Auth } from '../../providers/auth';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  public email:string = "";

  constructor(public nav:NavController, public loading:LoadingController, public auth:Auth, public alert:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPassword');
  }

  submitResetPassword(){
    let loading = this.loading.create({content: "Resetting password..."});
    loading.present();

    let data = {
      email: this.email,
    }

    this.auth.resetPassword(data).then( (result:any) => {
      //console.log("Successful reset: ", result);

      let alert = this.alert.create({
        title: 'Password reset email sent!',
        message: "A confirmation email has been sent to your email address. Please follow the instructions in the email to finish your reset.",
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
    }).catch(error => {
      console.log("Error in resetting password: ", error);

      let alert = this.alert.create({
        title: 'Password Reset Error',
        message: "We were unable to reset your password. Please check that your email is correct.",
        buttons: ['OK']
      });

      alert.present();
    }).then( () => {
      loading.dismiss();
    })
  }

}
