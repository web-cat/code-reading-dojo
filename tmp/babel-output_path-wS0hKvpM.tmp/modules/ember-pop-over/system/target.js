import Ember from "ember";

import _get from 'ember-metal/get';
import _set from 'ember-metal/set';
import { copy, generateGuid } from 'ember-metal/utils';
import computed from 'ember-computed';
import { w } from 'ember-string';
import { bind, next, later } from 'ember-runloop';
import $ from 'jquery';
import { assert } from 'ember-metal/utils';
import { A } from 'ember-array/utils';
import Evented from 'ember-evented';
import EmberObject from 'ember-object';

var isSimpleClick = Ember.ViewUtils.isSimpleClick;function guard(fn) {
  return function (evt) {
    if (_get(this, 'component.disabled')) {
      return;
    }
    fn.call(this, evt);
  };
}

function getElementForTarget(target) {
  if (typeof target === 'string') {
    return document.getElementById(target);
  } else if (_get(target, 'element')) {
    return _get(target, 'element');
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
  var $target = $(evt.target);
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
  return $(label).attr('for') === $(target).attr('id');
}

var VALID_ACTIVATORS = ["focus", "hover", "click", "hold"];
function parseActivators(value) {
  if (value) {
    var activators = value;
    if (typeof value === "string") {
      activators = A(w(value));
    }
    assert(value + ' are not valid activators.\n        Valid events are ' + VALID_ACTIVATORS.join(', '), A(copy(activators)).removeObjects(VALID_ACTIVATORS).length === 0);
    return activators;
  }

  assert('You must provide an event name to the {{pop-over}}.\n      Valid events are ' + VALID_ACTIVATORS.join(', '), false);
}

function poll(target, scope, fn) {
  if (getElementForTarget(target)) {
    scope[fn]();
  } else {
    next(null, poll, target, scope, fn);
  }
}

export default EmberObject.extend(Evented, {

  init: function init() {
    var target = _get(this, 'target');
    assert("You cannot make the {{pop-over}} a target of itself.", _get(this, 'component') !== target);

    this.eventManager = {
      focusin: bind(this, 'focus'),
      focusout: bind(this, 'blur'),
      mouseenter: bind(this, 'mouseEnter'),
      mouseleave: bind(this, 'mouseLeave'),
      mousedown: bind(this, 'mouseDown')
    };

    if (_get(target, 'element')) {
      this.attach();
    } else if (target.one) {
      target.one('didInsertElement', this, 'attach');
    } else if (typeof target === 'string') {
      poll(target, this, 'attach');
    }
  },

  attach: function attach() {
    var element = getElementForTarget(this.target);
    var $element = $(element);
    var $document = $(document);

    // Already attached or awaiting an element to exist
    if (_get(this, 'attached') || element == null) {
      return;
    }

    _set(this, 'attached', true);
    _set(this, 'element', element);

    var id = $element.attr('id');
    if (id == null) {
      id = generateGuid();
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
    var $element = $(element);
    var $document = $(document);

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
    _set(this, 'element', null);
    _set(this, 'target', null);
    _set(this, 'component', null);
  },

  on: computed({
    set: function set(key, value) {
      return parseActivators(value);
    }
  }),

  isClicked: function isClicked(evt) {
    if (isSimpleClick(evt)) {
      var label = labelForEvent(evt);
      var element = this.element;
      return evt.target === element || $.contains(element, evt.target) || isLabelClicked(element, label);
    }
    return false;
  },

  active: computed('focused', 'hovered', 'pressed', 'component.hovered', 'component.pressed', {
    set: function set(key, value) {
      var activators = _get(this, 'on');
      if (value) {
        if (activators.contains('focus')) {
          _set(this, 'focused', true);
        } else if (activators.contains('hover')) {
          _set(this, 'hovered', true);
        } else if (activators.contains('click')) {
          _set(this, 'pressed', true);
        }
      } else {
        _set(this, 'focused', false);
        _set(this, 'hovered', false);
        _set(this, 'pressed', false);
      }
      return value;
    },

    get: function get() {
      var activators = _get(this, 'on');
      var active = false;

      if (activators.contains('focus')) {
        active = active || _get(this, 'focused');
        if (activators.contains('hold')) {
          active = active || _get(this, 'component.pressed');
        }
      }

      if (activators.contains('hover')) {
        active = active || _get(this, 'hovered');
        if (activators.contains('hold')) {
          active = active || _get(this, 'component.hovered');
        }
      }

      if (activators.contains('click') || activators.contains('hold')) {
        active = active || _get(this, 'pressed');
      }

      return !!active;
    }
  }),

  focus: guard(function () {
    _set(this, 'focused', true);
  }),

  blur: guard(function () {
    _set(this, 'focused', false);
  }),

  mouseEnter: guard(function () {
    this._willLeave = false;
    _set(this, 'hovered', true);
    this._willLeave = false;
  }),

  mouseLeave: guard(function () {
    var _this = this;

    this._willLeave = true;
    later(function () {
      if (_get(_this, 'component.disabled')) {
        return;
      }
      if (_this._willLeave) {
        _this._willLeave = false;
        _set(_this, 'hovered', false);
      }
    }, 150);
  }),

  mouseDown: guard(function (evt) {
    if (!this.isClicked(evt)) {
      return false;
    }

    var element = this.element;
    var active = !_get(this, 'active');
    _set(this, 'pressed', active);

    if (active) {
      this.holdStart = new Date().getTime();

      var eventManager = this.eventManager;
      eventManager.mouseup = bind(this, 'mouseUp');
      $(document).on('mouseup', eventManager.mouseup);

      evt.preventDefault();
    }

    $(element).focus();
    return true;
  }),

  mouseUp: function mouseUp(evt) {
    // Remove mouseup event
    var eventManager = this.eventManager;
    $(document).off('mouseup', eventManager.mouseup);
    eventManager.mouseup = null;

    var label = labelForEvent(evt);

    // Treat clicks on <label> elements as triggers to
    // open the menu
    if (isLabelClicked(this.element, label)) {
      return true;
    }

    var activators = _get(this, 'on');

    if (activators.contains('click') && activators.contains('hold')) {
      // If the user waits more than 400ms between mouseDown and mouseUp,
      // we can assume that they are clicking and dragging to the menu item,
      // and we should close the menu if they mouseup anywhere not inside
      // the menu.
      if (new Date().getTime() - this.holdStart > 400) {
        _set(this, 'pressed', false);
      }
    }
    return true;
  }

});