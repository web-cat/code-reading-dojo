import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    invalidateSession() {
      window.location.replace(window.location.href);
      this.get('session').invalidate();

    }
  }
});
