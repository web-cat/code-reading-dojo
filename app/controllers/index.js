import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    // signout() {
    //   this.get('session').invalidate();
    // }
    invalidateSession() {
      this.get('session').invalidate();
    },
    setLevel() {
      this.set('session.data.level', 1);
      console.log('index');
      console.log(this.get('session.data.level'));
    }
  }
});
