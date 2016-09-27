define('game/tests/controllers/programs.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/programs.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/programs.js should pass jshint.');
  });
});