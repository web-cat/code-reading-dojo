define('ember-cordova/services/device/splashscreen', ['exports', 'ember'], function (exports, _ember) {
  /* global navigator */
  'use strict';

  var Service = _ember['default'].Service;
  var inject = _ember['default'].inject;
  var isPresent = _ember['default'].isPresent;
  exports['default'] = Service.extend({
    cordova: inject.service('cordova'),
    splashSelector: '#splashcreen',

    hide: function hide() {
      this.get('cordova').ready().then(function () {
        if (isPresent(navigator) && isPresent(navigator.splashscreen)) {
          navigator.splashscreen.hide();
        }
      });
    },

    show: function show() {
      this.get('cordova').ready().then(function () {
        if (isPresent(navigator) && isPresent(navigator.splashscreen)) {
          navigator.splashscreen.show();
        }
      });
    }
  });
});