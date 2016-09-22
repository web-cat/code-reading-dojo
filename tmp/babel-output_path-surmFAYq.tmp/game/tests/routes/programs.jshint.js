define('game/tests/routes/programs.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/programs.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/programs.js should pass jshint.');
  });
});