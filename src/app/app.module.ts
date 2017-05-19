import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

/* Pages */
import { RegisterPage } from '../pages/register/register';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';

/* Custom Providers */
import { Auth } from '../providers/auth';
import { User } from '../providers/user';
import { HTTP } from '../providers/http';

/* Ionic Native Plugins */
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    ResetPasswordPage,
    LoginPage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({name: '__ionic_db'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    ResetPasswordPage,
    LoginPage,
    SettingsPage
  ],
  providers: [
    StatusBar, SplashScreen, Network, Auth, User, HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
