import Ember from "ember";
import layout from './template';

import { assert } from 'ember-metal/utils';
import Component from 'ember-component';
import Target from "../../system/target";
import Rectangle from "../../system/rectangle";
import gravity from "../../system/gravity";

import { bind, scheduleOnce, next, once, later } from 'ember-runloop';
import _get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed, { bool, filterBy } from 'ember-computed';
import observer, { addObserver, removeObserver } from 'ember-metal/observer';
import { A } from 'ember-array/utils';
import on from 'ember-evented/on';
import $ from 'jquery';
import integrates from '../../computed/integrates';
import classify from '../../computed/classify';

var getOwner = Ember.getOwner || function (object) {
  return object.container;
};

export default Component.extend({

  layout: layout,

  active: false,

  supportsLiquidFire: integrates('liquid-fire'),

  classNames: ['pop-over'],

  classNameBindings: ['orientationClassName', 'pointerClassName', 'cover:position-over'],

  orientationClassName: classify('orient-{{orientation}}'),

  pointerClassName: classify('pointer-{{pointer}}'),

  disabled: false,

  orientation: null,

  pointer: null,

  flow: 'around',

  gravity: null,

  cover: false,

  /**
    The target element of the pop over.
    Can be a view, id, or element.
   */
  'for': null,

  on: null,

  addTarget: function addTarget(target, options) {
    _get(this, 'targets').pushObject(Target.create(options, {
      component: this,
      target: target
    }));
  },

  targets: computed({
    get: function get() {
      return A();
    }
  }),

  // ..............................................
  // Event management
  //

  attachWindowEvents: on('didInsertElement', function () {
    this.retile();

    var retile = this.__retile = bind(this, 'retile');
    ['scroll', 'resize'].forEach(function (event) {
      window.addEventListener(event, retile, true);
    });

    addObserver(this, 'active', this, 'retile');
  }),

  attachTargets: on('didInsertElement', function () {
    // Add implicit target
    if (_get(this, 'for') && _get(this, 'on')) {
      this.addTarget(_get(this, 'for'), {
        on: _get(this, 'on')
      });
    }

    next(this, function () {
      _get(this, 'targets').invoke('attach');
      var didinsert = _get(this, 'ondidinsert');
      if (didinsert) {
        didinsert(this);
      }
    });
  }),

  removeEvents: on('willDestroyElement', function () {
    _get(this, 'targets').invoke('detach');

    var retile = this.__retile;
    ['scroll', 'resize'].forEach(function (event) {
      window.removeEventListener(event, retile, true);
    });

    if (this.__documentClick) {
      document.removeEventListener('mousedown', this.__documentClick);
      this.__documentClick = null;
    }

    removeObserver(this, 'active', this, 'retile');
    this.__retile = null;
  }),

  mouseEnter: function mouseEnter() {
    if (_get(this, 'disabled')) {
      return;
    }
    this._willLeave = false;
    set(this, 'hovered', true);
    this._willLeave = false;
  },

  mouseLeave: function mouseLeave() {
    var _this = this;

    this._willLeave = true;
    later(function () {
      if (_get(_this, 'disabled')) {
        return;
      }
      if (A(A(_get(_this, 'targets')).filterBy('_willLeave', false)).isAny('hovered')) {
        _this._willLeave = false;
        set(_this, 'hovered', false);
      }

      if (_this._willLeave) {
        _this._willLeave = false;
        set(_this, 'hovered', false);
        _get(_this, 'targets').setEach('hovered', false);
      }
    }, 150);
  },

  mouseDown: function mouseDown() {
    if (_get(this, 'disabled')) {
      return;
    }
    set(this, 'pressed', true);
  },

  mouseUp: function mouseUp() {
    if (_get(this, 'disabled')) {
      return;
    }
    set(this, 'pressed', false);
  },

  documentClick: function documentClick(evt) {
    if (_get(this, 'disabled')) {
      return;
    }

    set(this, 'pressed', false);
    var targets = _get(this, 'targets');
    var element = _get(this, 'element');
    var clicked = evt.target === element || $.contains(element, evt.target);
    var clickedAnyTarget = targets.any(function (target) {
      return target.isClicked(evt);
    });

    if (!clicked && !clickedAnyTarget) {
      targets.setEach('pressed', false);
    }
  },

  areAnyTargetsActive: bool('activeTargets.length'),

  activeTargets: filterBy('targets', 'active', true),

  activeTarget: computed('activeTargets.[]', {
    get: function get() {
      if (_get(this, 'areAnyTargetsActive')) {
        return _get(this, 'targets').findBy('anchor', true) || _get(this, 'activeTargets.firstObject');
      }
      return null;
    }
  }),

  activate: function activate(target) {
    _get(this, 'targets').findBy('target', target).set('active', true);
  },

  deactivate: function deactivate(target) {
    _get(this, 'targets').findBy('target', target).set('active', false);
  },

  /**
    Before the menu is shown, setup click events
    to catch when the user clicks outside the
    menu.
   */
  visibilityDidChange: on('init', observer('areAnyTargetsActive', function () {
    var _this2 = this;

    once(function () {
      var proxy = _this2.__documentClick = _this2.__documentClick || bind(_this2, 'documentClick');
      var active = _get(_this2, 'areAnyTargetsActive');
      var inactive = !active;
      var visible = _get(_this2, 'active');
      var hidden = !visible;

      if (active && hidden) {
        document.addEventListener('mousedown', proxy);
        var target = _get(_this2, 'activeTarget');
        if (target) {
          var targetRect = Rectangle.ofElement(target.element, 'padding');
          var $offsetParent = _this2.$().offsetParent();
          var offset = $offsetParent.offset();
          _this2.$().css({
            top: targetRect.top + targetRect.height / 2 - offset.top + $offsetParent.scrollTop() + 'px',
            left: targetRect.left + targetRect.width / 2 - offset.left + $offsetParent.scrollLeft() + 'px'
          });
        }
        _this2.show();

        // Remove click events immediately
      } else if (inactive && visible) {
          document.removeEventListener('mousedown', proxy);
          _this2.hide();
        }
    });
  })),

  hide: function hide() {
    if (this.isDestroyed) {
      return;
    }
    _get(this, 'targets').setEach('active', false);
    set(this, 'active', false);
    if (_get(this, 'onhide')) {
      _get(this, 'onhide')();
    }
  },

  show: function show() {
    if (this.isDestroyed) {
      return;
    }
    set(this, 'active', true);
    if (_get(this, 'onshow')) {
      _get(this, 'onshow')();
    }
  },

  retile: function retile() {
    if (_get(this, 'active')) {
      scheduleOnce('afterRender', this, 'tile');
    }
  },

  tile: function tile() {
    var target = _get(this, 'activeTarget');
    // Don't tile if there's nothing to constrain the pop over around
    if (!_get(this, 'element') || !target) {
      return;
    }

    var $popover = this.$('> .pop-over-compass');
    if (_get(this, 'supportsLiquidFire')) {
      $popover = this.$('> .liquid-container > .liquid-child > .pop-over-compass');
    }

    var boundingElement = this.$().offsetParent()[0] || window;
    var boundingRect = Rectangle.ofElement(boundingElement);
    var popOverRect = Rectangle.ofElement($popover[0], 'borders');
    var targetRect = Rectangle.ofElement(target.element, 'padding');

    var $pointer = $popover.find('> .pop-over-container > .pop-over-pointer');
    var pointerRect = undefined;
    if ($pointer.length) {
      pointerRect = Rectangle.ofElement($pointer[0], 'borders');
    } else {
      pointerRect = new Rectangle(0, 0, 0, 0);
    }
    var shouldCover = this.cover;
    var constraints = [];

    if (boundingRect.intersects(targetRect)) {
      var gravityName = _get(this, 'gravity');
      if (gravityName) {
        constraints = _get(gravity[gravityName] || {}, 'constraints');
        assert('There is no gravity "' + gravityName + '".\n\n           Please choose one of ' + Object.keys(gravity).map(function (dir) {
          return '"' + dir + '"';
        }) + '.', constraints);
      } else {
        var flowName = _get(this, 'flow');
        constraints = getOwner(this).lookup('pop-over-constraint:' + flowName);
        assert('The flow named \'' + flowName + '\' was not registered with the {{pop-over}}.\n           Register your flow by adding an additional export to \'app/flows.js\':\n\n           export function ' + flowName + ' () {\n             return this.orientBelow().andSnapTo(this.center);\n           });', constraints);
      }

      var solution = undefined;
      for (var i = 0, len = constraints.length; i < len; i++) {
        solution = constraints[i].solveFor(boundingRect, targetRect, popOverRect, pointerRect, shouldCover);
        if (solution.valid) {
          break;
        }
      }

      this.setProperties({
        orientation: solution.orientation,
        pointer: solution.pointer
      });

      var offset = $popover.offsetParent().offset();
      popOverRect.top = popOverRect.top - offset.top;
      popOverRect.left = popOverRect.left - offset.left;

      $popover.css({
        top: popOverRect.top + 'px',
        left: popOverRect.left + 'px',
        width: popOverRect.width + 'px',
        height: popOverRect.height + 'px'
      });
      if ($pointer.length) {
        scheduleOnce('afterRender', this, 'positionPointer', $pointer, pointerRect);
      }
    }
  },

  positionPointer: function positionPointer($pointer, pointerRect) {
    $pointer.css({
      top: pointerRect.top + 'px',
      left: pointerRect.left + 'px'
    });
  }

});