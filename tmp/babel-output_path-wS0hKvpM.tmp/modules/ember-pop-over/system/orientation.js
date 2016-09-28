import Ember from "ember";
import Constraint from "./constraint";

var reads = Ember.computed.reads;
var slice = Array.prototype.slice;
var get = Ember.get;
var set = Ember.set;
var isArray = Ember.isArray;

export default Ember.Object.extend({

  init: function init() {
    this._super();

    this._constraints = Ember.A();
    set(this, 'defaultConstraint', {
      orientation: get(this, 'orientation')
    });
  },

  orientation: null,

  defaultConstraint: null,

  constraints: reads('defaultConstraint'),

  andSnapTo: function andSnapTo(snapGuidelines) {
    var constraints = Ember.A();
    var guideline = undefined;
    var orientation = get(this, 'orientation');

    snapGuidelines = slice.call(arguments);

    for (var i = 0, len = snapGuidelines.length; i < len; i++) {
      guideline = snapGuidelines[i];

      constraints.push(new Constraint({
        orientation: orientation,
        behavior: 'snap',
        guideline: guideline
      }));
    }

    if (!isArray(get(this, 'constraints'))) {
      set(this, 'constraints', Ember.A());
    }

    this._constraints.pushObjects(constraints);
    get(this, 'constraints').pushObjects(constraints);

    return this;
  },

  andSlideBetween: function andSlideBetween() {
    var constraint = new Constraint({
      orientation: get(this, 'orientation'),
      behavior: 'slide',
      guideline: slice.call(arguments)
    });

    if (!isArray(get(this, 'constraints'))) {
      set(this, 'constraints', Ember.A());
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