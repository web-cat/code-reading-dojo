define('ember-pop-over/components/pop-over/component', ['exports', 'ember', 'ember-pop-over/components/pop-over/template', 'ember-metal/utils', 'ember-component', 'ember-pop-over/system/target', 'ember-pop-over/system/rectangle', 'ember-pop-over/system/gravity', 'ember-runloop', 'ember-metal/get', 'ember-metal/set', 'ember-computed', 'ember-metal/observer', 'ember-array/utils', 'ember-evented/on', 'jquery', 'ember-pop-over/computed/integrates', 'ember-pop-over/computed/classify'], function (exports, _ember, _emberPopOverComponentsPopOverTemplate, _emberMetalUtils, _emberComponent, _emberPopOverSystemTarget, _emberPopOverSystemRectangle, _emberPopOverSystemGravity, _emberRunloop, _emberMetalGet, _emberMetalSet, _emberComputed, _emberMetalObserver, _emberArrayUtils, _emberEventedOn, _jquery, _emberPopOverComputedIntegrates, _emberPopOverComputedClassify) {
  'use strict';

  var getOwner = _ember['default'].getOwner || function (object) {
    return object.container;
  };

  exports['default'] = _emberComponent['default'].extend({

    layout: _emberPopOverComponentsPopOverTemplate['default'],

    active: false,

    supportsLiquidFire: (0, _emberPopOverComputedIntegrates['default'])('liquid-fire'),

    classNames: ['pop-over'],

    classNameBindings: ['orientationClassName', 'pointerClassName', 'cover:position-over'],

    orientationClassName: (0, _emberPopOverComputedClassify['default'])('orient-{{orientation}}'),

    pointerClassName: (0, _emberPopOverComputedClassify['default'])('pointer-{{pointer}}'),

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
      (0, _emberMetalGet['default'])(this, 'targets').pushObject(_emberPopOverSystemTarget['default'].create(options, {
        component: this,
        target: target
      }));
    },

    targets: (0, _emberComputed['default'])({
      get: function get() {
        return (0, _emberArrayUtils.A)();
      }
    }),

    // ..............................................
    // Event management
    //

    attachWindowEvents: (0, _emberEventedOn['default'])('didInsertElement', function () {
      this.retile();

      var retile = this.__retile = (0, _emberRunloop.bind)(this, 'retile');
      ['scroll', 'resize'].forEach(function (event) {
        window.addEventListener(event, retile, true);
      });

      (0, _emberMetalObserver.addObserver)(this, 'active', this, 'retile');
    }),

    attachTargets: (0, _emberEventedOn['default'])('didInsertElement', function () {
      // Add implicit target
      if ((0, _emberMetalGet['default'])(this, 'for') && (0, _emberMetalGet['default'])(this, 'on')) {
        this.addTarget((0, _emberMetalGet['default'])(this, 'for'), {
          on: (0, _emberMetalGet['default'])(this, 'on')
        });
      }

      (0, _emberRunloop.next)(this, function () {
        (0, _emberMetalGet['default'])(this, 'targets').invoke('attach');
        var didinsert = (0, _emberMetalGet['default'])(this, 'ondidinsert');
        if (didinsert) {
          didinsert(this);
        }
      });
    }),

    removeEvents: (0, _emberEventedOn['default'])('willDestroyElement', function () {
      (0, _emberMetalGet['default'])(this, 'targets').invoke('detach');

      var retile = this.__retile;
      ['scroll', 'resize'].forEach(function (event) {
        window.removeEventListener(event, retile, true);
      });

      if (this.__documentClick) {
        document.removeEventListener('mousedown', this.__documentClick);
        this.__documentClick = null;
      }

      (0, _emberMetalObserver.removeObserver)(this, 'active', this, 'retile');
      this.__retile = null;
    }),

    mouseEnter: function mouseEnter() {
      if ((0, _emberMetalGet['default'])(this, 'disabled')) {
        return;
      }
      this._willLeave = false;
      (0, _emberMetalSet['default'])(this, 'hovered', true);
      this._willLeave = false;
    },

    mouseLeave: function mouseLeave() {
      var _this = this;

      this._willLeave = true;
      (0, _emberRunloop.later)(function () {
        if ((0, _emberMetalGet['default'])(_this, 'disabled')) {
          return;
        }
        if ((0, _emberArrayUtils.A)((0, _emberArrayUtils.A)((0, _emberMetalGet['default'])(_this, 'targets')).filterBy('_willLeave', false)).isAny('hovered')) {
          _this._willLeave = false;
          (0, _emberMetalSet['default'])(_this, 'hovered', false);
        }

        if (_this._willLeave) {
          _this._willLeave = false;
          (0, _emberMetalSet['default'])(_this, 'hovered', false);
          (0, _emberMetalGet['default'])(_this, 'targets').setEach('hovered', false);
        }
      }, 150);
    },

    mouseDown: function mouseDown() {
      if ((0, _emberMetalGet['default'])(this, 'disabled')) {
        return;
      }
      (0, _emberMetalSet['default'])(this, 'pressed', true);
    },

    mouseUp: function mouseUp() {
      if ((0, _emberMetalGet['default'])(this, 'disabled')) {
        return;
      }
      (0, _emberMetalSet['default'])(this, 'pressed', false);
    },

    documentClick: function documentClick(evt) {
      if ((0, _emberMetalGet['default'])(this, 'disabled')) {
        return;
      }

      (0, _emberMetalSet['default'])(this, 'pressed', false);
      var targets = (0, _emberMetalGet['default'])(this, 'targets');
      var element = (0, _emberMetalGet['default'])(this, 'element');
      var clicked = evt.target === element || _jquery['default'].contains(element, evt.target);
      var clickedAnyTarget = targets.any(function (target) {
        return target.isClicked(evt);
      });

      if (!clicked && !clickedAnyTarget) {
        targets.setEach('pressed', false);
      }
    },

    areAnyTargetsActive: (0, _emberComputed.bool)('activeTargets.length'),

    activeTargets: (0, _emberComputed.filterBy)('targets', 'active', true),

    activeTarget: (0, _emberComputed['default'])('activeTargets.[]', {
      get: function get() {
        if ((0, _emberMetalGet['default'])(this, 'areAnyTargetsActive')) {
          return (0, _emberMetalGet['default'])(this, 'targets').findBy('anchor', true) || (0, _emberMetalGet['default'])(this, 'activeTargets.firstObject');
        }
        return null;
      }
    }),

    activate: function activate(target) {
      (0, _emberMetalGet['default'])(this, 'targets').findBy('target', target).set('active', true);
    },

    deactivate: function deactivate(target) {
      (0, _emberMetalGet['default'])(this, 'targets').findBy('target', target).set('active', false);
    },

    /**
      Before the menu is shown, setup click events
      to catch when the user clicks outside the
      menu.
     */
    visibilityDidChange: (0, _emberEventedOn['default'])('init', (0, _emberMetalObserver['default'])('areAnyTargetsActive', function () {
      var _this2 = this;

      (0, _emberRunloop.once)(function () {
        var proxy = _this2.__documentClick = _this2.__documentClick || (0, _emberRunloop.bind)(_this2, 'documentClick');
        var active = (0, _emberMetalGet['default'])(_this2, 'areAnyTargetsActive');
        var inactive = !active;
        var visible = (0, _emberMetalGet['default'])(_this2, 'active');
        var hidden = !visible;

        if (active && hidden) {
          document.addEventListener('mousedown', proxy);
          var target = (0, _emberMetalGet['default'])(_this2, 'activeTarget');
          if (target) {
            var targetRect = _emberPopOverSystemRectangle['default'].ofElement(target.element, 'padding');
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
      (0, _emberMetalGet['default'])(this, 'targets').setEach('active', false);
      (0, _emberMetalSet['default'])(this, 'active', false);
      if ((0, _emberMetalGet['default'])(this, 'onhide')) {
        (0, _emberMetalGet['default'])(this, 'onhide')();
      }
    },

    show: function show() {
      if (this.isDestroyed) {
        return;
      }
      (0, _emberMetalSet['default'])(this, 'active', true);
      if ((0, _emberMetalGet['default'])(this, 'onshow')) {
        (0, _emberMetalGet['default'])(this, 'onshow')();
      }
    },

    retile: function retile() {
      if ((0, _emberMetalGet['default'])(this, 'active')) {
        (0, _emberRunloop.scheduleOnce)('afterRender', this, 'tile');
      }
    },

    tile: function tile() {
      var target = (0, _emberMetalGet['default'])(this, 'activeTarget');
      // Don't tile if there's nothing to constrain the pop over around
      if (!(0, _emberMetalGet['default'])(this, 'element') || !target) {
        return;
      }

      var $popover = this.$('> .pop-over-compass');
      if ((0, _emberMetalGet['default'])(this, 'supportsLiquidFire')) {
        $popover = this.$('> .liquid-container > .liquid-child > .pop-over-compass');
      }

      var boundingElement = this.$().offsetParent()[0] || window;
      var boundingRect = _emberPopOverSystemRectangle['default'].ofElement(boundingElement);
      var popOverRect = _emberPopOverSystemRectangle['default'].ofElement($popover[0], 'borders');
      var targetRect = _emberPopOverSystemRectangle['default'].ofElement(target.element, 'padding');

      var $pointer = $popover.find('> .pop-over-container > .pop-over-pointer');
      var pointerRect = undefined;
      if ($pointer.length) {
        pointerRect = _emberPopOverSystemRectangle['default'].ofElement($pointer[0], 'borders');
      } else {
        pointerRect = new _emberPopOverSystemRectangle['default'](0, 0, 0, 0);
      }
      var shouldCover = this.cover;
      var constraints = [];

      if (boundingRect.intersects(targetRect)) {
        var gravityName = (0, _emberMetalGet['default'])(this, 'gravity');
        if (gravityName) {
          constraints = (0, _emberMetalGet['default'])(_emberPopOverSystemGravity['default'][gravityName] || {}, 'constraints');
          (0, _emberMetalUtils.assert)('There is no gravity "' + gravityName + '".\n\n           Please choose one of ' + Object.keys(_emberPopOverSystemGravity['default']).map(function (dir) {
            return '"' + dir + '"';
          }) + '.', constraints);
        } else {
          var flowName = (0, _emberMetalGet['default'])(this, 'flow');
          constraints = getOwner(this).lookup('pop-over-constraint:' + flowName);
          (0, _emberMetalUtils.assert)('The flow named \'' + flowName + '\' was not registered with the {{pop-over}}.\n           Register your flow by adding an additional export to \'app/flows.js\':\n\n           export function ' + flowName + ' () {\n             return this.orientBelow().andSnapTo(this.center);\n           });', constraints);
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
          (0, _emberRunloop.scheduleOnce)('afterRender', this, 'positionPointer', $pointer, pointerRect);
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
});