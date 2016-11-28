import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticate() {
      this.get('session').authenticate('authenticator:devise', this.get('email'), this.get('password'))
      .catch((reason) => {

        this.set('errorMessage', reason.error ||reason);
        console.log('######################');
        console.log(this.get('errorMessage'));
      });
      console.log('$$$$$$$$$$$$$');
      this.set('session.data.authenticated.email', this.get('email'));
      console.log(this.get('session.data'));
    }
  }
});
