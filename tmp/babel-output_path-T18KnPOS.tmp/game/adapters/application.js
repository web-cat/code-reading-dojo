define('game/adapters/application', ['exports', 'ember-data/adapters/json-api'], function (exports, _emberDataAdaptersJsonApi) {
  exports['default'] = _emberDataAdaptersJsonApi['default'].extend({
    host: 'http://172.30.119.213:3000'
  });
});