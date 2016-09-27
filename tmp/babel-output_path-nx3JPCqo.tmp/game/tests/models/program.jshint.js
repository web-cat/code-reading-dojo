define('game/tests/models/program.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/program.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/program.js should pass jshint.');
  });
});