define('game/tests/routes/protected.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/protected.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/protected.js should pass jshint.');
  });
});