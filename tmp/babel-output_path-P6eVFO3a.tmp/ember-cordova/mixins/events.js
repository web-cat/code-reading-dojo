define('ember-cordova/mixins/events', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var Mixin = _ember['default'].Mixin;
  var deprecate = _ember['default'].deprecate;
  var get = _ember['default'].get;
  var inject = _ember['default'].inject;
  var on = _ember['default'].on;
  exports['default'] = Mixin.create({
    cordova: inject.service(),

    subscribeToCordovaEvents: on('init', function () {
      var _this = this;

      var cordova = this.get('cordova'),
          onCordova = this.get('onCordova');

      _ember['default'].deprecate('Use of `onCordova` and the CordovaEventsMixin is deprecated. Please ' + 'import `ember-cordova/utils/subscribe` and call w/ ' + '`subscribe(eventName, function() { ... });`', onCordova === undefined, { url: 'https://github.com/isleofcode/ember-cordova/issues/83#issuecomment-236441319' });

      if (onCordova === undefined) {
        return;
      }
      Object.keys(onCordova).forEach(function (key) {
        var func = get(onCordova, key);

        if (func instanceof Array) {
          func.filter(_this._validateIsFunction, _this).forEach(function (fn) {
            cordova.on(key, _this, fn);
          });
        } else if (_this._validateIsFunction(func)) {
          cordova.on(key, _this, func);
        }
      }, this);
    }),

    _validateIsFunction: function _validateIsFunction(func) {
      if (func instanceof Function) {
        return true;
      }
      if (typeof func === 'string') {
        return this.get(func) instanceof Function;
      }

      return false;
    }
  });
});