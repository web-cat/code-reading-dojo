define('game/helpers/concat', ['exports', 'ember'], function (exports, _ember) {

  var concat = function concat(params) {
    return params[0].concat(params[1]);
  };
  exports['default'] = _ember['default'].Helper.helper(concat);
});