define('game/tests/flows.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | flows.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'flows.js should pass jshint.');
  });
});