import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('new');
  this.route('protected');
  this.route('auth-error');
  this.route('beginner', { path: '/beginner/:beginner_id' });
  this.route('intermediate', { path: '/intermediate/:intermediate_id' });
  this.route('advanced', { path: '/advanced/:advanced_id' });
});

export default Router;
