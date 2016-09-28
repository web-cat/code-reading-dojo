define('game/controllers/login', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),

    actions: {
      authenticate: function authenticate() {
        this.get('session').authenticate('authenticator:devise', this.get('email'), this.get('password'));
      }
    }
  });

  // export default Ember.Controller.extend({
  //   session: Ember.inject.service('session'),
  //
  //   actions: {
  //     authenticate() {
  //       let { identification, password } = this.getProperties('identification','password');
  //
  //       this.get('session').authenticate('authenticator:oauth2', identification, password).catch((reason) => {
  //         this.set('errorMessage',reason.error);
  //       });
  //     }
  //   }
  // });

  //
  // export default Ember.Controller.extend({
  //   session: Ember.inject.service(),
  //
  //   actions: {
  //     authenticate: function() {
  //       var credentials = this.getProperties('identification', 'password'),
  //         authenticator = 'authenticator:token';
  //
  //         this.get('session').authenticate(authenticator,credentials);
  //     }
  //   }
  // });
});