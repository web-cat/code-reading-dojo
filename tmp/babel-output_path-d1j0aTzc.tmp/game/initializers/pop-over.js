define("game/initializers/pop-over", ["exports", "ember-pop-over/system/flow", "game/config/environment", "game/flows", "ember-metal/get", "ember-array/utils"], function (exports, _emberPopOverSystemFlow, _gameConfigEnvironment, _gameFlows, _emberMetalGet, _emberArrayUtils) {
  var initialize = function initialize(app) {
    (0, _emberArrayUtils.A)(Object.keys(_gameFlows)).forEach(function (flowName) {
      if (flowName == 'default') {
        return;
      }
      var constraints = (0, _emberMetalGet["default"])(_gameFlows[flowName].call(_emberPopOverSystemFlow["default"].create()), 'constraints');
      app.register("pop-over-constraint:" + flowName, constraints, { instantiate: false });
    });
  };

  exports.initialize = initialize;
  exports["default"] = {
    name: "register-pop-over-flows",
    initialize: initialize
  };
});