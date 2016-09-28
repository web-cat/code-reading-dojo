define('game/controllers/completed', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    currentUrl: 't',
    clicked: 'false',
    actions: {
      getCurrentUrl: function getCurrentUrl() {
        this.set('currentUrl', window.location.href.split("/").pop());
        this.set('clicked', 'true');
      },
      unclicked: function unclicked() {
        this.set('clicked', 'false');
      }
    }
  });
});