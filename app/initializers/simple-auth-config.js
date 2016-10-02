import MyAppnameENV from '../config/environment';
export default {
  name: 'simple-auth-config',
  before: 'ember-simple-auth',
  initialize: function() {

    var tokenEndpoint = '/users/sign_in';
    MyAppnameENV['ember-simple-auth'] = {
      authorizer: 'authorizer:devise',
      crossOriginWhitelist:[
        MyAppnameENV.SERVER_URL
      ],
      serverTokenEndpoint: MyAppnameENV.SERVER_URL + tokenEndpoint
    };

    MyAppnameENV['simple-auth-devise'] = {
      serverTokenEndpoint: MyAppnameENV.SERVER_URL + tokenEndpoint
    };

    window.ENV = MyAppnameENV;
  }
};
