// app/authorizers/devise.js
import DeviseAuthorizer from 'ember-simple-auth/authorizers/devise';

export default DeviseAuthorizer.extend({
  serverTokenEndpoint: 'http://172.31.5.152:3000/token'
});
