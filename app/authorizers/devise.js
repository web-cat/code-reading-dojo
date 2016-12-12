// app/authorizers/devise.js
import DeviseAuthorizer from 'ember-simple-auth/authorizers/devise';

export default DeviseAuthorizer.extend({
  serverTokenEndpoint: 'http://192.168.1.103:3000/token'
});
