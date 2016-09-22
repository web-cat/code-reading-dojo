define("ember-pop-over/system/orientation", ["exports", "ember", "ember-pop-over/system/constraint"], function (exports, _ember, _emberPopOverSystemConstraint) {
  "use strict";

  var reads = _ember["default"].computed.reads;
  var slice = Array.prototype.slice;
  var get = _ember["default"].get;
  var set = _ember["default"].set;
  var isArray = _ember["default"].isArray;

  exports["default"] = _ember["default"].Object.extend({

    init: function init() {
      this._super();

      this._constraints = _ember["default"].A();
      set(this, 'defaultConstraint', {
        orientation: get(this, 'orientation')
      });
    },

    orientation: null,

    defaultConstraint: null,

    constraints: reads('defaultConstraint'),

    andSnapTo: function andSnapTo(snapGuidelines) {
      var constraints = _ember["default"].A();
      var guideline = undefined;
      var orientation = get(this, 'orientation');

      snapGuidelines = slice.call(arguments);

      for (var i = 0, len = snapGuidelines.length; i < len; i++) {
        guideline = snapGuidelines[i];

        constraints.push(new _emberPopOverSystemConstraint["default"]({
          orientation: orientation,
          behavior: 'snap',
          guideline: guideline
        }));
      }

      if (!isArray(get(this, 'constraints'))) {
        set(this, 'constraints', _ember["default"].A());
      }

      this._constraints.pushObjects(constraints);
      get(this, 'constraints').pushObjects(constraints);

      return this;
    },

    andSlideBetween: function andSlideBetween() {
      var constraint = new _emberPopOverSystemConstraint["default"]({
        orientation: get(this, 'orientation'),
        behavior: 'slide',
        guideline: slice.call(arguments)
      });

      if (!isArray(get(this, 'constraints'))) {
        set(this, 'constraints', _ember["default"].A());
      }

      this._constraints.pushObject(constraint);

      // Always unshift slide constraints,
      // since they should be handled first
      get(this, 'constraints').unshiftObjects(constraint);

      return this;
    },

    where: function where(condition) {
      this._constraints.forEach(function (constraint) {
        constraint.condition = condition;
      });

      return this;
    },

    then: function then(guideline) {
      if (guideline !== this) {
        get(this, 'constraints').pushObjects(get(guideline, 'constraints'));
      }

      return this;
    }

  });
});