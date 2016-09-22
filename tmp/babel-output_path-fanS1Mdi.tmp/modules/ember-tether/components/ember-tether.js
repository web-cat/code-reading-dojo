import Ember from 'ember';

var observer = Ember.observer;
var get = Ember.get;
var run = Ember.run;
var computed = Ember.computed;

export default Ember.Component.extend({
  classNames: ['ember-tether'],
  classPrefix: 'ember-tether',
  target: null,
  attachment: null,
  targetAttachment: null,
  offset: null,
  targetOffset: null,
  targetModifier: null,
  constraints: null,
  optimizations: null,

  didInsertElement: function didInsertElement() {
    this._super.apply(this, arguments);
    this.addTether();
  },

  willDestroyElement: function willDestroyElement() {
    var _this = this;

    this._super.apply(this, arguments);
    var _tether = this._tether;
    var element = this.element;

    run.schedule('render', function () {
      _this.removeElement(element);
      _this.removeTether(_tether);
    });
  },

  didRender: function didRender() {
    this._super.apply(this, arguments);
    this.positionTether();
  },

  tetherDidChange: observer('classPrefix', 'target', 'attachment', 'targetAttachment', 'offset', 'targetOffset', 'targetModifier', 'constraints', 'optimizations', function () {
    this.removeTether(this._tether);
    this.addTether();
  }),

  positionTether: function positionTether() {
    if (this._tether) {
      this._tether.position();
    }
  },

  addTether: function addTether() {
    if (get(this, '_tetherTarget')) {
      this._tether = new Tether(this._tetherOptions());
    }
  },

  removeTether: function removeTether(tether) {
    if (tether) {
      tether.destroy();
    }
  },

  removeElement: function removeElement(element) {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  },

  _tetherTarget: computed('target', function () {
    var t = get(this, 'target');
    if (t && t.element) {
      t = t.element;
    }
    return t;
  }),

  _tetherOptions: function _tetherOptions() {
    var _this2 = this;

    var options = {
      element: this.element,
      target: get(this, '_tetherTarget')
    };
    ['classPrefix', 'attachment', 'targetAttachment', 'offset', 'targetOffset', 'targetModifier', 'constraints', 'optimizations'].forEach(function (k) {
      var v = get(_this2, k);
      if (!Ember.isNone(v)) {
        options[k] = v;
      }
    });
    return options;
  }
});