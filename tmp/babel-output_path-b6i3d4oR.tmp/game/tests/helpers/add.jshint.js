define('game/tests/helpers/add.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/add.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/add.js should pass jshint.');
  });
});