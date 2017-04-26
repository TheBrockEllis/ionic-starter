# Ionic Starter app

This is a template for Ionic 3 apps. It includes a few providers that I like to use and want to include in all new Ionic apps.

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
