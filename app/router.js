import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('programs',{ path: '/programs/:program_id' });
  this.route('completed',{ path: '/completed/:level' });
  this.route('user', { path: '/users/:user_id' });
  this.route('about');
  this.route('contact');
  this.route('new');
  this.route('login');
  this.route('practice');
  this.route('beginner', { path: '/beginner/:beginner_id' });
  this.route('intermediate', { path: '/intermediate/:intermediate_id' });
  this.route('advanced', { path: '/advanced/:advanced_id' });
  this.route('protected');
  this.route('survey');
});

export default Router;
