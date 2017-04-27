# Ionic Starter app

This is a template for Ionic 3 apps. It includes a few providers that I like to use and want to include in all new Ionic apps.

## Getting Started
- git clone
- `npm install` to install ndependencies
- `ionic state reset` to install cordova plugins

## Providers

### Auth

This provider uses the Angular Http module directly for authenticating with a 3rd party API server. It uses HTTP Basic Auth to encode username and password and also handles password reset, sign up, etc.

### Http

This provider is a wrapper around the Angular Http module. It automatically appends API access tokens to all outgoing requests for authentication. It handles all RESTful actions (get, post, put, delete). The only information it stores is the access token for the user.

### User

This provider is responsible for handling all of the data about the user. When the user successfully authenticates, this provider will be responsible for storing and retrieving data. All app-specific info should be routed through it's getters and setters.

## Ionic Native Plugins

- Network
  - `ionic plugin add cordova-plugin-network-information`
  - `npm install --save @ionic-native/network`
- Storage
  Pre-installed with Ionic
- StatusBar
  Pre-installed with Ionic
- SplashScreen
  Pre-installed with Ionic

## Pages
- Login
- Register
- PasswordReset
- Home

- Need to add a logo to `assets/img/logo.png` to show up on the login page

## hooks

- Added a `before_prepare` in the `hooks/` directory. It should fire on every build and increment a build number inside of the `config.xml` file. It's only dependency is xml2js installed via `npm install xml2js --save`

## ionicnativemodule
- `npm uninstall --save @ionic-native/core`
- `npm install --save @ionic-native/core@latest`
