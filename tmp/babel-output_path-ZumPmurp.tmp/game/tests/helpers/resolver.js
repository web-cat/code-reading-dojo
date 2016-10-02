define('game/tests/helpers/resolver', ['exports', 'game/resolver', 'game/config/environment'], function (exports, _gameResolver, _gameConfigEnvironment) {

  var resolver = _gameResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _gameConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _gameConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});