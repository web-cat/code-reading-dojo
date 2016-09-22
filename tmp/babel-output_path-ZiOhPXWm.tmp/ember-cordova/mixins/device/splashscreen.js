define('ember-cordova/mixins/device/splashscreen', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var Mixin = _ember['default'].Mixin;
  var inject = _ember['default'].inject;
  exports['default'] = Mixin.create({
    splashscreen: inject.service('device/splashscreen'),

    afterModel: function afterModel() {
      this.get('splashscreen').hide();

      return this._super.apply(this, arguments);
    }
  });
});