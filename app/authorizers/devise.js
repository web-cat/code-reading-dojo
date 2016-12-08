// app/authorizers/devise.js
import DeviseAuthorizer from 'ember-simple-auth/authorizers/devise';

export default DeviseAuthorizer.extend({
  serverTokenEndpoint: 'http://172.30.207.166:3000/token'
});
