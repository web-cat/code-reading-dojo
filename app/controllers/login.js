import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  notify: Ember.inject.service('notify'),
  actions: {
    authenticate: function() {

      this.get('session').authenticate('authenticator:devise', this.get('email'), this.get('password'))
      .catch((reason) => {
        this.set('errorMessage', reason.error ||reason);
        this.get('notify').alert(JSON.stringify(this.get('errorMessage')['errors']));
    //    console.log('######################');
        console.log(this.get('errorMessage'));
      });
      // console.log('****************');
      // console.log(this.get('email'));
      // console.log('$$$$$$$$$$$$$');
      this.set('session.data.uid', this.get('email'));
      this.set('session.data.email', this.get('email'));
      this.set('session.data.authenticated.email', this.get('email'));
      this.set('session.data.level', 1);
      var current = this;
      var useremail = this.get('email');
      // console.log("LOGGGGIIIIIN");
      var m = this.get('model');
      m.map(function(model) {
      var email = model.get('email');
      if (email===useremail) {
        var completed = parseInt(model.get('levelcompleted')) + 1;
         console.log("YEEEEEY");
         console.log(completed);
        current.set('session.data.level', completed);
      }
      });
      // this.set('session.data.level',users[0]);
      // console.log(this.get('session.data.level'));
    }
  }
});
