define('game/tests/test-helper', ['exports', 'game/tests/helpers/resolver', 'ember-qunit'], function (exports, _gameTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_gameTestsHelpersResolver['default']);
});