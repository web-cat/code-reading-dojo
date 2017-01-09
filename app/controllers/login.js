import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  notify: Ember.inject.service('notify'),
  actions: {
    authenticate() {
      this.get('session').authenticate('authenticator:devise', this.get('email'), this.get('password'))
      .catch((reason) => {
        this.set('errorMessage', reason.error ||reason);
        this.get('notify').alert(JSON.stringify(this.get('errorMessage')['errors']));
        console.log('######################');
        console.log(this.get('errorMessage'));
      });
      // console.log('****************');
      // console.log(this.get('email'));
      // console.log('$$$$$$$$$$$$$');
      this.set('session.data.uid', this.get('email'));
      this.set('session.data.email', this.get('email'));
      this.set('session.data.authenticated.email', this.get('email'));
      // console.log(this.get('session.data'));
    }
  }
});
