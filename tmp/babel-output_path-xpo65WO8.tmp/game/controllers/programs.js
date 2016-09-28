define('game/controllers/programs', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    currentUrl: 'y',
    clicked: false,
    actions: {
      getCurrentUrl: function getCurrentUrl() {
        this.set('currentUrl', window.location.href.split("/").pop());
        this.set('clicked', 'true');
      },
      clicked: function clicked() {
        if (this.get('clicked') === true) {
          this.set('clicked', false);
        } else {
          this.set('clicked', true);
        }
      }
    }
  });
});