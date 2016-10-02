define('game/tests/models/advanced.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/advanced.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/advanced.js should pass jshint.');
  });
});