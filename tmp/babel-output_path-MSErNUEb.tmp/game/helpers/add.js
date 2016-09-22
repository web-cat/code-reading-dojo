define('game/helpers/add', ['exports', 'ember'], function (exports, _ember) {

  var add = function add(params) {
    return parseInt(params[0]) + parseInt(params[1]);
  };
  exports['default'] = _ember['default'].Helper.helper(add);
});