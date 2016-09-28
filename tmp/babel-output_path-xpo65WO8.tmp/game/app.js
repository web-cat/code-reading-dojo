define('game/app', ['exports', 'ember', 'game/resolver', 'ember-load-initializers', 'game/config/environment'], function (exports, _ember, _gameResolver, _emberLoadInitializers, _gameConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _gameConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _gameConfigEnvironment['default'].podModulePrefix,
    Resolver: _gameResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _gameConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});