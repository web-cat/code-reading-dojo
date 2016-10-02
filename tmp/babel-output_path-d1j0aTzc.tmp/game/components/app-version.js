define('game/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'game/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _gameConfigEnvironment) {

  var name = _gameConfigEnvironment['default'].APP.name;
  var version = _gameConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});