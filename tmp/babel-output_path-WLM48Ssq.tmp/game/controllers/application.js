define('game/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),

    actions: {
      // signout() {
      //   this.get('session').invalidate();
      // }
      invalidateSession: function invalidateSession() {
        this.get('session').invalidate();
      }
    }
  });
});