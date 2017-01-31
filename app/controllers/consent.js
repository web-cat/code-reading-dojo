import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Controller.extend({
  session:     service('session'),
  currentUser: service('current-user'),
  actions: {
    submit: function(user){
      // console.log('*********************');
      // console.log(JSON.stringify(user));
      var consent = Ember.$('input[name="consent"]:checked').val();
      //console.log('*********************');
      //console.log(consent);
      // console.log(thisLevel);
      user.set('consent', consent);
      this.set('session.data.consent',consent);
      user.save();
    }
  }
});
