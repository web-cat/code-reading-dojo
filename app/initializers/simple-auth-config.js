// app/initializers/simple-auth-config.js
// app/initializers/simple-auth-config.js
import ENV from 'game/config/environment';
import DeviseAuthenticator from 'ember-simple-auth/authenticators/devise';
/// app/initializers/simple-auth-config.js
export default {
  name: 'simple-auth-config',
  before: 'simple-auth',
  initialize: function() {

    var tokenEndpoint = '/users/sign_in';
    ENV['simple-auth'] = {
      authorizer: 'simple-auth-authorizer:devise',
      crossOriginWhitelist:[
        ENV.SERVER_URL
      ]
    };

    ENV['simple-auth-devise'] = {
      serverTokenEndpoint: ENV.SERVER_URL + tokenEndpoint
    };

    window.ENV = ENV;
  }
};
