define('ember-pop-over/system/target', ['exports', 'ember', 'ember-metal/get', 'ember-metal/set', 'ember-metal/utils', 'ember-computed', 'ember-string', 'ember-runloop', 'jquery', 'ember-array/utils', 'ember-evented', 'ember-object'], function (exports, _ember, _emberMetalGet, _emberMetalSet, _emberMetalUtils, _emberComputed, _emberString, _emberRunloop, _jquery, _emberArrayUtils, _emberEvented, _emberObject) {
  'use strict';

  var isSimpleClick = _ember['default'].ViewUtils.isSimpleClick;function guard(fn) {
    return function (evt) {
      if ((0, _emberMetalGet['default'])(this, 'component.disabled')) {
        return;
      }
      fn.call(this, evt);
    };
  }

  function getElementForTarget(target) {
    if (typeof target === 'string') {
      return document.getElementById(target);
    } else if ((0, _emberMetalGet['default'])(target, 'element')) {
      return (0, _emberMetalGet['default'])(target, 'element');
    } else {
      return target;
    }
  }

  function getLabelSelector($element) {
    var id = $element.attr('id');
    if (id) {
      return 'label[for="' + id + '"]';
    }
  }

  function labelForEvent(evt) {
    var $target = (0, _jquery['default'])(evt.target);
    if ($target[0].tagName.toLowerCase() === 'label') {
      return $target;
    } else {
      return $target.parents('label');
    }
  }

  function isLabelClicked(target, label) {
    if (label == null) {
      return false;
    }
    return (0, _jquery['default'])(label).attr('for') === (0, _jquery['default'])(target).attr('id');
  }

  var VALID_ACTIVATORS = ["focus", "hover", "click", "hold"];
  function parseActivators(value) {
    if (value) {
      var activators = value;
      if (typeof value === "string") {
        activators = (0, _emberArrayUtils.A)((0, _emberString.w)(value));
      }
      (0, _emberMetalUtils.assert)(value + ' are not valid activators.\n        Valid events are ' + VALID_ACTIVATORS.join(', '), (0, _emberArrayUtils.A)((0, _emberMetalUtils.copy)(activators)).removeObjects(VALID_ACTIVATORS).length === 0);
      return activators;
    }

    (0, _emberMetalUtils.assert)('You must provide an event name to the {{pop-over}}.\n      Valid events are ' + VALID_ACTIVATORS.join(', '), false);
  }

  function poll(target, scope, fn) {
    if (getElementForTarget(target)) {
      scope[fn]();
    } else {
      (0, _emberRunloop.next)(null, poll, target, scope, fn);
    }
  }

  exports['default'] = _emberObject['default'].extend(_emberEvented['default'], {

    init: function init() {
      var target = (0, _emberMetalGet['default'])(this, 'target');
      (0, _emberMetalUtils.assert)("You cannot make the {{pop-over}} a target of itself.", (0, _emberMetalGet['default'])(this, 'component') !== target);

      this.eventManager = {
        focusin: (0, _emberRunloop.bind)(this, 'focus'),
        focusout: (0, _emberRunloop.bind)(this, 'blur'),
        mouseenter: (0, _emberRunloop.bind)(this, 'mouseEnter'),
        mouseleave: (0, _emberRunloop.bind)(this, 'mouseLeave'),
        mousedown: (0, _emberRunloop.bind)(this, 'mouseDown')
      };

      if ((0, _emberMetalGet['default'])(target, 'element')) {
        this.attach();
      } else if (target.one) {
        target.one('didInsertElement', this, 'attach');
      } else if (typeof target === 'string') {
        poll(target, this, 'attach');
      }
    },

    attach: function attach() {
      var element = getElementForTarget(this.target);
      var $element = (0, _jquery['default'])(element);
      var $document = (0, _jquery['default'])(document);

      // Already attached or awaiting an element to exist
      if ((0, _emberMetalGet['default'])(this, 'attached') || element == null) {
        return;
      }

      (0, _emberMetalSet['default'])(this, 'attached', true);
      (0, _emberMetalSet['default'])(this, 'element', element);

      var id = $element.attr('id');
      if (id == null) {
        id = (0, _emberMetalUtils.generateGuid)();
        $element.attr('id', id);
      }

      var eventManager = this.eventManager;

      Object.keys(eventManager).forEach(function (event) {
        $document.on(event, '#' + id, eventManager[event]);
      });

      var selector = getLabelSelector($element);
      if (selector) {
        Object.keys(eventManager).forEach(function (event) {
          $document.on(event, selector, eventManager[event]);
        });
      }
    },

    detach: function detach() {
      var element = this.element;
      var $element = (0, _jquery['default'])(element);
      var $document = (0, _jquery['default'])(document);

      var eventManager = this.eventManager;

      var id = $element.attr('id');
      Object.keys(eventManager).forEach(function (event) {
        $document.off(event, '#' + id, eventManager[event]);
      });

      var selector = getLabelSelector($element);
      if (selector) {
        Object.keys(eventManager).forEach(function (event) {
          $document.off(event, selector, eventManager[event]);
        });
      }

      // Remove references for GC
      this.eventManager = null;
      (0, _emberMetalSet['default'])(this, 'element', null);
      (0, _emberMetalSet['default'])(this, 'target', null);
      (0, _emberMetalSet['default'])(this, 'component', null);
    },

    on: (0, _emberComputed['default'])({
      set: function set(key, value) {
        return parseActivators(value);
      }
    }),

    isClicked: function isClicked(evt) {
      if (isSimpleClick(evt)) {
        var label = labelForEvent(evt);
        var element = this.element;
        return evt.target === element || _jquery['default'].contains(element, evt.target) || isLabelClicked(element, label);
      }
      return false;
    },

    active: (0, _emberComputed['default'])('focused', 'hovered', 'pressed', 'component.hovered', 'component.pressed', {
      set: function set(key, value) {
        var activators = (0, _emberMetalGet['default'])(this, 'on');
        if (value) {
          if (activators.contains('focus')) {
            (0, _emberMetalSet['default'])(this, 'focused', true);
          } else if (activators.contains('hover')) {
            (0, _emberMetalSet['default'])(this, 'hovered', true);
          } else if (activators.contains('click')) {
            (0, _emberMetalSet['default'])(this, 'pressed', true);
          }
        } else {
          (0, _emberMetalSet['default'])(this, 'focused', false);
          (0, _emberMetalSet['default'])(this, 'hovered', false);
          (0, _emberMetalSet['default'])(this, 'pressed', false);
        }
        return value;
      },

      get: function get() {
        var activators = (0, _emberMetalGet['default'])(this, 'on');
        var active = false;

        if (activators.contains('focus')) {
          active = active || (0, _emberMetalGet['default'])(this, 'focused');
          if (activators.contains('hold')) {
            active = active || (0, _emberMetalGet['default'])(this, 'component.pressed');
          }
        }

        if (activators.contains('hover')) {
          active = active || (0, _emberMetalGet['default'])(this, 'hovered');
          if (activators.contains('hold')) {
            active = active || (0, _emberMetalGet['default'])(this, 'component.hovered');
          }
        }

        if (activators.contains('click') || activators.contains('hold')) {
          active = active || (0, _emberMetalGet['default'])(this, 'pressed');
        }

        return !!active;
      }
    }),

    focus: guard(function () {
      (0, _emberMetalSet['default'])(this, 'focused', true);
    }),

    blur: guard(function () {
      (0, _emberMetalSet['default'])(this, 'focused', false);
    }),

    mouseEnter: guard(function () {
      this._willLeave = false;
      (0, _emberMetalSet['default'])(this, 'hovered', true);
      this._willLeave = false;
    }),

    mouseLeave: guard(function () {
      var _this = this;

      this._willLeave = true;
      (0, _emberRunloop.later)(function () {
        if ((0, _emberMetalGet['default'])(_this, 'component.disabled')) {
          return;
        }
        if (_this._willLeave) {
          _this._willLeave = false;
          (0, _emberMetalSet['default'])(_this, 'hovered', false);
        }
      }, 150);
    }),

    mouseDown: guard(function (evt) {
      if (!this.isClicked(evt)) {
        return false;
      }

      var element = this.element;
      var active = !(0, _emberMetalGet['default'])(this, 'active');
      (0, _emberMetalSet['default'])(this, 'pressed', active);

      if (active) {
        this.holdStart = new Date().getTime();

        var eventManager = this.eventManager;
        eventManager.mouseup = (0, _emberRunloop.bind)(this, 'mouseUp');
        (0, _jquery['default'])(document).on('mouseup', eventManager.mouseup);

        evt.preventDefault();
      }

      (0, _jquery['default'])(element).focus();
      return true;
    }),

    mouseUp: function mouseUp(evt) {
      // Remove mouseup event
      var eventManager = this.eventManager;
      (0, _jquery['default'])(document).off('mouseup', eventManager.mouseup);
      eventManager.mouseup = null;

      var label = labelForEvent(evt);

      // Treat clicks on <label> elements as triggers to
      // open the menu
      if (isLabelClicked(this.element, label)) {
        return true;
      }

      var activators = (0, _emberMetalGet['default'])(this, 'on');

      if (activators.contains('click') && activators.contains('hold')) {
        // If the user waits more than 400ms between mouseDown and mouseUp,
        // we can assume that they are clicking and dragging to the menu item,
        // and we should close the menu if they mouseup anywhere not inside
        // the menu.
        if (new Date().getTime() - this.holdStart > 400) {
          (0, _emberMetalSet['default'])(this, 'pressed', false);
        }
      }
      return true;
    }

  });
});