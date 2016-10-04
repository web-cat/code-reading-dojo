import MyAppnameENV from '../config/environment';


// app/initializers/simple-auth-config.js
export default {
  name: 'simple-auth-config',
  before: 'ember-simple-auth',
  initialize: function() {

    var tokenEndpoint = '/users/sign_in';
    MyAppnameENV['ember-simple-auth'] = {
      authorizer: 'simple-auth-authorizer:devise',
      
      crossOriginWhitelist:[
        MyAppnameENV.host
      ]
    };

    MyAppnameENV['simple-auth-devise'] = {
      serverTokenEndpoint: MyAppnameENV.host + tokenEndpoint
    };

    window.ENV = MyAppnameENV;
  }
};
