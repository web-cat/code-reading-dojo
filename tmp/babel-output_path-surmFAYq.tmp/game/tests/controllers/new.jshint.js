define('game/tests/controllers/new.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/new.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/new.js should pass jshint.');
  });
});