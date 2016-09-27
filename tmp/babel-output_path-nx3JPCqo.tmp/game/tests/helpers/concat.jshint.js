define('game/tests/helpers/concat.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/concat.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/concat.js should pass jshint.');
  });
});