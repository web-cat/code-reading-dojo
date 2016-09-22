define('ember-pop-over/mixins/scroll_sandbox', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var debounce = _ember['default'].run.debounce;
  var set = _ember['default'].set;
  var get = _ember['default'].get;
  var bind = _ember['default'].run.bind;

  var on = _ember['default'].on;

  // Normalize mouseWheel events
  function mouseWheel(evt) {
    var oevt = evt.originalEvent;
    var delta = 0;
    var deltaY = 0;
    var deltaX = 0;

    if (oevt.wheelDelta) {
      delta = oevt.wheelDelta / 120;
    }
    if (oevt.detail) {
      delta = oevt.detail / -3;
    }

    deltaY = delta;

    if (oevt.hasOwnProperty) {
      // Gecko
      if (oevt.hasOwnProperty('axis') && oevt.axis === oevt.HORIZONTAL_AXIS) {
        deltaY = 0;
        deltaX = -1 * delta;
      }

      // Webkit
      if (oevt.hasOwnProperty('wheelDeltaY')) {
        deltaY = oevt.wheelDeltaY / +120;
      }
      if (oevt.hasOwnProperty('wheelDeltaX')) {
        deltaX = oevt.wheelDeltaX / -120;
      }
    }

    evt.wheelDeltaX = deltaX;
    evt.wheelDeltaY = deltaY;

    return this.mouseWheel(evt);
  }

  /**
    Adding this mixin to a component will add scroll behavior that bounds
    the scrolling to the contents of the box.
  
    When the user has stopped scrolling and they are at an edge of the
    box, then it will relinquish control to the parent scroll container.
  
    This is useful when designing custom pop overs that scroll
    that should behave like native controls.
  
    @class ScrollSandbox
    @extends Ember.Mixin
   */
  exports['default'] = _ember['default'].Mixin.create({

    setupScrollHandlers: on('didInsertElement', function () {
      this._mouseWheelHandler = bind(this, mouseWheel);
      this.$().on('mousewheel DOMMouseScroll', this._mouseWheelHandler);
    }),

    scrollingHasStopped: function scrollingHasStopped() {
      set(this, 'isScrolling', false);
    },

    /** @private
      Prevent scrolling the result list from scrolling
      the window.
     */
    mouseWheel: function mouseWheel(evt) {
      var $element = this.$();
      var scrollTop = $element.scrollTop();
      var maximumScrollTop = $element.prop('scrollHeight') - $element.outerHeight();
      var isAtScrollEdge = undefined;

      if (evt.wheelDeltaY > 0) {
        isAtScrollEdge = scrollTop === 0;
      } else if (evt.wheelDeltaY < 0) {
        isAtScrollEdge = scrollTop === maximumScrollTop;
      }

      if (get(this, 'isScrolling') && isAtScrollEdge) {
        evt.preventDefault();
        evt.stopPropagation();
      } else if (!isAtScrollEdge) {
        set(this, 'isScrolling', true);
      }
      debounce(this, this.scrollingHasStopped, 75);
    },

    teardownScrollHandlers: on('willDestroyElement', function () {
      this.$().off('mousewheel DOMMouseScroll', this._mouseWheelHandler);
    })
  });
});