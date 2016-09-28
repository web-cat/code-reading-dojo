define('game/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'game/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _gameConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_gameConfigEnvironment['default'].APP.name, _gameConfigEnvironment['default'].APP.version)
  };
});