define('ember-bootstrap/utils/array-includes', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  /**
   * Handle Ember.Array.contains deprecation: http://emberjs.com/deprecations/v2.x/#toc_enumerable-contains
   *
   * @param array
   * @param value
   * @public
   */
  var includes = undefined;
  if (typeof _ember['default'].Array.includes === 'function') {
    includes = function arrayIncludes(array, value) {
      return array.includes(value);
    };
  } else {
    includes = function arrayContains(array, value) {
      return array.contains(value);
    };
  }

  exports['default'] = includes;
});