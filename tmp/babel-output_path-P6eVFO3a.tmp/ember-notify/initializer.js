define('ember-notify/initializer', ['exports'], function (exports) {
  'use strict';

  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    application.inject('route', 'notify', 'service:notify');
    application.inject('controller', 'notify', 'service:notify');
  }

  exports['default'] = {
    name: 'inject-notify-service',
    initialize: initialize
  };
});