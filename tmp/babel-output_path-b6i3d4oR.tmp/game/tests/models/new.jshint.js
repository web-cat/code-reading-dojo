define('game/tests/models/new.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/new.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/new.js should pass jshint.');
  });
});