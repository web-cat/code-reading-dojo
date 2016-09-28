define('ember-bootstrap/helpers/bs-contains', ['exports', 'ember', 'ember-bootstrap/utils/array-includes'], function (exports, _ember, _emberBootstrapUtilsArrayIncludes) {
  'use strict';

  exports.bsContains = bsContains;

  var isArray = _ember['default'].isArray;
  var A = _ember['default'].A;

  function bsContains(params /*, hash*/) {
    return isArray(params[0]) ? (0, _emberBootstrapUtilsArrayIncludes['default'])(A(params[0]), params[1]) : false;
  }

  exports['default'] = _ember['default'].Helper.helper(bsContains);
});