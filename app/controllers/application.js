// import Ember from 'ember';
//
// export default Ember.Controller.extend({
//   session: Ember.inject.service('session'),
//
//   actions: {
//     authenticate() {
//       this.get('session').authenticate('authenticator:devise', this.get('email'), this.get('password'));
//     },
//     invalidateSession() {
//       this.get('session').invalidate();
//     }
//   }
// });

// app/controllers/application.js
import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
