import MyAppnameENV from '../config/environment';


// app/initializers/simple-auth-config.js
export default {
  name: 'simple-auth-config',
  before: 'ember-simple-auth',
  initialize: function() {
    var tokenEndpoint = '/users/sign_in';
    MyAppnameENV['ember-simple-auth'] = {
      authorizer: 'simple-auth-authorizer:devise',
      crossOriginWhitelist:[MyAppnameENV.SERVER_URL]
    };

    MyAppnameENV['simple-auth-devise'] = {
      serverTokenEndpoint: MyAppnameENV.SERVER_URL + tokenEndpoint
    };

    window.ENV = MyAppnameENV;
  }
};
