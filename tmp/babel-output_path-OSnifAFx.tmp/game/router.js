define('game/router', ['exports', 'ember', 'game/config/environment'], function (exports, _ember, _gameConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _gameConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('programs', { path: '/programs/:program_id' });
    this.route('completed', { path: '/completed/:level' });
    this.route('user', { path: '/users/:user_id' });
    this.route('about');
    this.route('contact');
    this.route('new');
    this.route('login');
    this.route('practice');
    this.route('beginner', { path: '/beginner/:beginner_id' });
    this.route('intermediate', { path: '/intermediate/:intermediate_id' });
    this.route('advanced', { path: '/advanced/:advanced_id' });
  });

  exports['default'] = Router;
});